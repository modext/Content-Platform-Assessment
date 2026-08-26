import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { PostsList } from "@/features/posts/components/posts-list";
import { postQueries } from "@/features/posts/queries";
import { getQueryClient } from "@/lib/query-client";

export const metadata: Metadata = {
  title: "Posts | Content Platform",
};

export default async function PostsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postQueries.list());

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Posts
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover content published across the platform.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsList />
      </HydrationBoundary>
    </section>
  );
}
