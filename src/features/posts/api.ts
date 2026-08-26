import { apiClient } from "@/lib/axios";

import type { GetPostsParams, Post } from "./types";

export async function getPosts(params: GetPostsParams = {}): Promise<Post[]> {
  const response = await apiClient.get<Post[]>("/posts", { params });

  return response.data;
}

export async function getPost(postId: Post["id"]): Promise<Post> {
  const response = await apiClient.get<Post>("/posts/" + postId);

  return response.data;
}
