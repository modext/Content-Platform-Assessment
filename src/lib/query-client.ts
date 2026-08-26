import { isServer, QueryClient } from "@tanstack/react-query";

import { ApiError } from "./api-error";

const QUERY_STALE_TIME = 60_000;
const MAX_QUERY_RETRIES = 2;

function shouldRetryQuery(failureCount: number, error: Error): boolean {
  if (
    error instanceof ApiError &&
    error.status !== undefined &&
    error.status >= 400 &&
    error.status < 500 &&
    error.status !== 408 &&
    error.status !== 429
  ) {
    return false;
  }

  return failureCount < MAX_QUERY_RETRIES;
}

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetryQuery,
        staleTime: QUERY_STALE_TIME,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (isServer) {
    return createQueryClient();
  }

  browserQueryClient ??= createQueryClient();

  return browserQueryClient;
}
