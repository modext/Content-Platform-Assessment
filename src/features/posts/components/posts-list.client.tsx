"use client";

import { useSearchParams } from "next/navigation";

import { getPostsEmptyMessage } from "@/features/posts/lib/get-posts-empty-message";
import { parsePostsSearchParams } from "@/features/posts/lib/parse-posts-search-params";
import { usePosts } from "@/features/posts/hooks";

import { PostsListView } from "./posts-list-view";
import { PostsListError, PostsListPending } from "./posts-list-status";

export function PostsList() {
  const searchParams = useSearchParams();
  const filters = parsePostsSearchParams(
    Object.fromEntries(searchParams.entries()),
  );
  const { data, isPending, isError, refetch } = usePosts(filters);

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

  return (
    <PostsListView posts={data} emptyMessage={getPostsEmptyMessage(filters)} />
  );
}
