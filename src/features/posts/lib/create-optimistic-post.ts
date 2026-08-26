import type { CreatePostInput, Post } from "@/features/posts/types";

/** Temporary negative id — replaced by the API response on success. */
export function createOptimisticPost(input: CreatePostInput): Post {
  return {
    id: -Date.now(),
    title: input.title.trim(),
    body: input.body.trim(),
    userId: input.userId,
  };
}

export function isOptimisticPostId(id: Post["id"]): boolean {
  return id < 0;
}
