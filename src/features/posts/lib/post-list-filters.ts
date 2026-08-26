import type { GetPostsParams, Post } from "@/features/posts/types";

export function postMatchesListFilters(
  post: Post,
  filters: GetPostsParams,
): boolean {
  if (filters.userId !== undefined && post.userId !== filters.userId) {
    return false;
  }

  const normalizedQuery = filters.query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return (
    post.title.toLowerCase().includes(normalizedQuery) ||
    post.body.toLowerCase().includes(normalizedQuery)
  );
}

export function filterPostsByQuery(
  posts: Post[],
  query: string | undefined,
): Post[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter((post) => postMatchesListFilters(post, { query }));
}
