import "server-only";

import { cache } from "react";

import { getComments } from "@/features/comments/api";
import { getPosts } from "@/features/posts/api";
import type { Post } from "@/features/posts/types";
import { getUsers } from "@/features/users/api";

export interface DashboardMetrics {
  postsCount: number;
  authorsCount: number;
  commentsCount: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recentPosts: Post[];
}

export const getDashboardData = cache(
  async function getDashboardData(): Promise<DashboardData> {
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
    ]);

    const recentPosts = [...posts].sort((a, b) => b.id - a.id).slice(0, 5);

    return {
      metrics: {
        postsCount: posts.length,
        authorsCount: users.length,
        commentsCount: comments.length,
      },
      recentPosts,
    };
  },
);
