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
            {post.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
