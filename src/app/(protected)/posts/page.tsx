import type { Metadata } from "next";

import { PostsList } from "@/features/posts/components/posts-list";
import { getPosts } from "@/features/posts/api";

export const metadata: Metadata = {
  title: "Posts | Content Platform",
};

export default async function PostsPage() {
  const posts = await getPosts();

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

      <PostsList posts={posts} />
    </section>
  );
}
