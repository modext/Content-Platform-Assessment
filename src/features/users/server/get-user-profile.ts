import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";

import { getPosts } from "@/features/posts/api";
import type { Post } from "@/features/posts/types";
import { ApiError } from "@/lib/api-error";

import { getUser } from "../api";
import type { User } from "../types";

export interface UserProfileData {
  user: User;
  posts: Post[];
}

export const getUserProfile = cache(async function getUserProfile(
  userId: User["id"],
): Promise<UserProfileData> {
  try {
    const [user, posts] = await Promise.all([
      getUser(userId),
      getPosts({ userId }),
    ]);

    return { user, posts };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
});
