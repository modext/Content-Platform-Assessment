import Link from "next/link";

import { PostsListView } from "@/features/posts/components/posts-list-view";
import type { Post } from "@/features/posts/types";

interface DashboardRecentPostsProps {
  posts: Post[];
}

export function DashboardRecentPosts({ posts }: DashboardRecentPostsProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Recent posts
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Latest activity from the content feed.
          </p>
        </div>
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          View all
        </Link>
      </div>

      <PostsListView
        posts={posts}
        emptyState={{
          title: "No recent posts",
          description:
            "There is no recent activity to highlight on the dashboard.",
          action: { label: "Browse posts", href: "/posts" },
        }}
      />
    </section>
  );
}
