import { HydrationBoundary } from "@tanstack/react-query";

import { prefetchPostsList } from "@/features/posts/server/prefetch-posts-list";

import { PostsList } from "./posts-list.client";

export async function PostsListSection() {
  const dehydratedState = await prefetchPostsList();

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostsList />
    </HydrationBoundary>
  );
}
