import { Suspense } from "react";

import { HydrationBoundary } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUsers } from "@/features/users/api";
import { prefetchPostsList } from "@/features/posts/server/prefetch-posts-list";
import type { GetPostsParams } from "@/features/posts/types";

import { PostsAuthorFilter } from "./posts-author-filter";
import { PostsList } from "./posts-list.client";
import { PostsListPending } from "./posts-list-status";
import { PostsSearchForm } from "./posts-search-form";

interface PostsListSectionProps {
  filters?: GetPostsParams;
}

async function getAuthorOptions() {
  try {
    const users = await getUsers();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  } catch {
    return [];
  }
}

export async function PostsListSection({
  filters = {},
}: PostsListSectionProps) {
  const [dehydratedState, authors] = await Promise.all([
    prefetchPostsList(filters),
    getAuthorOptions(),
  ]);

  const authorsUnavailable = authors.length === 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Discover posts</CardTitle>
          <CardDescription>
            Search by keyword or filter by author.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={null}>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <PostsSearchForm />
              <PostsAuthorFilter
                authors={authors}
                authorsUnavailable={authorsUnavailable}
              />
            </div>
          </Suspense>
        </CardContent>
      </Card>

      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<PostsListPending />}>
          <PostsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
