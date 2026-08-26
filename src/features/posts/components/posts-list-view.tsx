import { EmptyState } from "@/components/ui/empty-state";

import type { Post } from "@/features/posts/types";

import { PostCard } from "./post-card";

interface PostsListViewProps {
  posts: Post[];
  emptyState?: {
    title: string;
    description: string;
    action?: { label: string; href: string };
  };
}

export function PostsListView({ posts, emptyState }: PostsListViewProps) {
  if (posts.length === 0) {
    if (!emptyState) {
      return (
        <EmptyState
          title="No posts found"
          description="There is nothing to show in this list right now."
        />
      );
    }

    return <EmptyState {...emptyState} />;
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
