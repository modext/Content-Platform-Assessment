import type { Post } from "@/features/posts/types";

export function parsePostId(value: string): Post["id"] | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id) || id < 1) {
    return null;
  }

  return id;
}
