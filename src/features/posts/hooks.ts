"use client";

import { useQuery } from "@tanstack/react-query";

import { postQueries } from "./queries";
import type { GetPostsParams } from "./types";

export function usePosts(params: GetPostsParams = {}) {
  return useQuery(postQueries.list(params));
}
