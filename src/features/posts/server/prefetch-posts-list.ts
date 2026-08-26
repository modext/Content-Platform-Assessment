import "server-only";

import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";

import { postQueries } from "../queries";
import type { GetPostsParams } from "../types";

export async function prefetchPostsList(params: GetPostsParams = {}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(postQueries.list(params));

  return dehydrate(queryClient);
}
