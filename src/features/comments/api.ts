import { apiClient } from "@/lib/axios";

import type { Comment, GetCommentsParams } from "./types";

export async function getComments(
  params: GetCommentsParams = {},
): Promise<Comment[]> {
  const response = await apiClient.get<Comment[]>("/comments", { params });

  return response.data;
}
