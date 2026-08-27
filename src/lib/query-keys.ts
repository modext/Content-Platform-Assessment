import type { QueryKey } from "@tanstack/react-query";

export function createQueryKeys<TScope extends string>(scope: TScope) {
  return {
    all: [scope] as const,
    lists: () => [scope, "list"] as const,
    list: <TParams extends Record<string, unknown>>(
      params: TParams = {} as TParams,
    ) => [scope, "list", params] as const,
    details: () => [scope, "detail"] as const,
    detail: <TId>(id: TId) => [scope, "detail", id] as const,
  };
}

export function getListParamsFromQueryKey<TParams = Record<string, unknown>>(
  queryKey: QueryKey,
): TParams {
  const params = queryKey[2];

  if (params && typeof params === "object") {
    return params as TParams;
  }

  return {} as TParams;
}
