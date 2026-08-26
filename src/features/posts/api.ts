import { apiClient } from "@/lib/axios";

import type { CreatePostInput, GetPostsParams, Post } from "./types";

function filterPostsByQuery(posts: Post[], query: string | undefined): Post[] {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return posts;
  }

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.body.toLowerCase().includes(normalizedQuery),
  );
}

export async function getPosts(params: GetPostsParams = {}): Promise<Post[]> {
  const { query, userId } = params;
  const response = await apiClient.get<Post[]>("/posts", {
    params: userId === undefined ? undefined : { userId },
  });

  return filterPostsByQuery(response.data, query);
}

export async function getPost(postId: Post["id"]): Promise<Post> {
  const response = await apiClient.get<Post>("/posts/" + postId);

  return response.data;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const response = await apiClient.post<Post>("/posts", {
    title: input.title.trim(),
    body: input.body.trim(),
    userId: input.userId,
  });

  return response.data;
}
