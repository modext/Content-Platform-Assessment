import { queryOptions } from "@tanstack/react-query";

import { getUsers } from "./api";

const USERS_QUERY_KEY = "users";

export const userKeys = {
  all: [USERS_QUERY_KEY] as const,
  lists: () => [USERS_QUERY_KEY, "list"] as const,
  list: () => [USERS_QUERY_KEY, "list", "all"] as const,
};

export const userQueries = {
  list: () =>
    queryOptions({
      queryKey: userKeys.list(),
      queryFn: getUsers,
    }),
};
