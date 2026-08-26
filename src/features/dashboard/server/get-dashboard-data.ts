import "server-only";

import { cache } from "react";

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
    const [posts, users] = await Promise.all([getPosts(), getUsers()]);

    return {
      metrics: {
        postsCount: posts.length,
        authorsCount: users.length,
        commentsCount: posts.length,
      },
      recentPosts: posts.slice(0, 5),
    };
  },
);
