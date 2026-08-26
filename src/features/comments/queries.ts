import { queryOptions } from "@tanstack/react-query";

import { getComments } from "./api";
import type { GetCommentsParams } from "./types";

const COMMENTS_QUERY_KEY = "comments";

export const commentKeys = {
  all: [COMMENTS_QUERY_KEY] as const,
  lists: () => [COMMENTS_QUERY_KEY, "list"] as const,
  list: (params: GetCommentsParams) =>
    [COMMENTS_QUERY_KEY, "list", params] as const,
};

export const commentQueries = {
  list(params: GetCommentsParams = {}) {
    const filters = { ...params };

    return queryOptions({
      queryKey: commentKeys.list(filters),
      queryFn: () => getComments(filters),
    });
  },
};
