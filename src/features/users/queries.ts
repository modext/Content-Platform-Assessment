import { queryOptions } from "@tanstack/react-query";

import { createQueryKeys } from "@/lib/query-keys";

import { getUser, getUsers } from "./api";
import type { User } from "./types";

export const userKeys = createQueryKeys("users");

export const userQueries = {
  list: () =>
    queryOptions({
      queryKey: userKeys.list({}),
      queryFn: getUsers,
    }),

  detail(userId: User["id"]) {
    return queryOptions({
      queryKey: userKeys.detail(userId),
      queryFn: () => getUser(userId),
    });
  },
};
