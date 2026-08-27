import { queryOptions } from "@tanstack/react-query";

import { createQueryKeys } from "@/lib/query-keys";

import { getPost, getPosts } from "./api";
import type { GetPostsParams, Post } from "./types";

export const postKeys = createQueryKeys("posts");

export const postQueries = {
  list(params: GetPostsParams = {}) {
    const filters = { ...params };

    return queryOptions({
      queryKey: postKeys.list(filters),
      queryFn: () => getPosts(filters),
    });
  },

  detail(postId: Post["id"]) {
    return queryOptions({
      queryKey: postKeys.detail(postId),
      queryFn: () => getPost(postId),
    });
  },
};
