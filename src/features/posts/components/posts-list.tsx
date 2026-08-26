"use client";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { postQueries } from "@/features/posts/queries";

import { PostsListView } from "./posts-list-view";

export function PostsList() {
  const { data, isPending, isError, refetch } = useQuery(postQueries.list());

  if (isPending) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading posts...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3" role="alert">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Unable to load posts. Please try again.
        </p>
        <Button variant="secondary" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return <PostsListView posts={data} />;
}
