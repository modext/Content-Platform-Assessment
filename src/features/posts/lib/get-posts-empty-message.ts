import type { GetPostsParams } from "@/features/posts/types";

export function getPostsEmptyMessage(filters: GetPostsParams): string {
  const { query, userId } = filters;

  if (query && userId !== undefined) {
    return `No posts match "${query}" for the selected author.`;
  }

  if (query) {
    return `No posts match "${query}". Try a different search term.`;
  }

  if (userId !== undefined) {
    return "No posts found for the selected author.";
  }

  return "No posts found.";
}
