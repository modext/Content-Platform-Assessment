import "server-only";

import { notFound } from "next/navigation";
import { cache } from "react";

import { getComments } from "@/features/comments/api";
import type { Comment } from "@/features/comments/types";
import { getUser } from "@/features/users/api";
import type { User } from "@/features/users/types";
import { ApiError } from "@/lib/api-error";

import type { Post } from "../types";
import { getCachedPost } from "./get-cached-post";

export interface PostDetailData {
  post: Post;
  author: User;
  comments: Comment[];
}

export const getPostDetail = cache(async function getPostDetail(
  postId: Post["id"],
): Promise<PostDetailData> {
  try {
    const post = await getCachedPost(postId);

    const [author, comments] = await Promise.all([
      getUser(post.userId),
      getComments({ postId }),
    ]);

    return { post, author, comments };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
});
