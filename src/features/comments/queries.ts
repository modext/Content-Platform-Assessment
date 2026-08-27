import { queryOptions } from "@tanstack/react-query";

import { createQueryKeys } from "@/lib/query-keys";

import { getComments } from "./api";
import type { GetCommentsParams } from "./types";

export const commentKeys = createQueryKeys("comments");

export const commentQueries = {
  list(params: GetCommentsParams = {}) {
    const filters = { ...params };

    return queryOptions({
      queryKey: commentKeys.list(filters),
      queryFn: () => getComments(filters),
    });
  },
};
