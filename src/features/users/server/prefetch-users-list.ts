import "server-only";

import { dehydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";

import { userQueries } from "../queries";

export async function prefetchUsersList() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(userQueries.list());

  return dehydrate(queryClient);
}
