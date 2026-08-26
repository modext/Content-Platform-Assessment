import { queryOptions } from "@tanstack/react-query";

import { getPost, getPosts } from "./api";
import type { GetPostsParams, Post } from "./types";

const POSTS_QUERY_KEY = "posts";

export const postKeys = {
  all: [POSTS_QUERY_KEY] as const,
  lists: () => [POSTS_QUERY_KEY, "list"] as const,
  list: (params: GetPostsParams) => [POSTS_QUERY_KEY, "list", params] as const,
  details: () => [POSTS_QUERY_KEY, "detail"] as const,
  detail: (postId: Post["id"]) => [POSTS_QUERY_KEY, "detail", postId] as const,
};

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
