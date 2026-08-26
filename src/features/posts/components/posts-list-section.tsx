import { Suspense } from "react";

import { HydrationBoundary } from "@tanstack/react-query";

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

export async function PostsListSection({
  filters = {},
}: PostsListSectionProps) {
  const [dehydratedState, users] = await Promise.all([
    prefetchPostsList(filters),
    getUsers(),
  ]);

  const authors = users.map((user) => ({
    id: user.id,
    name: user.name,
  }));

  return (
    <div className="space-y-6">
      <Suspense fallback={null}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
          <PostsSearchForm />
          <PostsAuthorFilter authors={authors} />
        </div>
      </Suspense>

      <HydrationBoundary state={dehydratedState}>
        <Suspense fallback={<PostsListPending />}>
          <PostsList />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
