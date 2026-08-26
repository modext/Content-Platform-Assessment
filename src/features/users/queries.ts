import { queryOptions } from "@tanstack/react-query";

import { getUser, getUsers } from "./api";
import type { User } from "./types";

const USERS_QUERY_KEY = "users";

export const userKeys = {
  all: [USERS_QUERY_KEY] as const,
  lists: () => [USERS_QUERY_KEY, "list"] as const,
  list: () => [USERS_QUERY_KEY, "list", "all"] as const,
  details: () => [USERS_QUERY_KEY, "detail"] as const,
  detail: (userId: User["id"]) => [USERS_QUERY_KEY, "detail", userId] as const,
};

export const userQueries = {
  list: () =>
    queryOptions({
      queryKey: userKeys.list(),
      queryFn: getUsers,
    }),

  detail(userId: User["id"]) {
    return queryOptions({
      queryKey: userKeys.detail(userId),
      queryFn: () => getUser(userId),
    });
  },
};
