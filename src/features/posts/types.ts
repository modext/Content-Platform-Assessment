export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface GetPostsParams {
  userId?: number;
  /** Client-side title/body filter — JSONPlaceholder has no text search API. */
  query?: string;
}
