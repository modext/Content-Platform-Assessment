import Link from "next/link";

import type { Post } from "@/features/posts/types";

interface PostsListViewProps {
  posts: Post[];
}

export function PostsListView({ posts }: PostsListViewProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No posts found.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {posts.map((post) => (
        <li key={post.id} className="py-4 first:pt-0 last:pb-0">
          <h2 className="text-base font-medium text-zinc-950 dark:text-zinc-50">
            <Link
              href={`/posts/${post.id}`}
              className="underline-offset-4 transition-colors hover:underline"
            >
              {post.title}
            </Link>
          </h2>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
