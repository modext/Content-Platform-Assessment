"use client";

import { usePosts } from "@/features/posts/hooks";

import { PostsListView } from "./posts-list-view";
import { PostsListError, PostsListPending } from "./posts-list-status";

export function PostsList() {
  const { data, isPending, isError, refetch } = usePosts();

  if (isPending) {
    return <PostsListPending />;
  }

  if (isError) {
    return (
      <PostsListError
        message="Unable to load posts. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return <PostsListView posts={data} />;
}
