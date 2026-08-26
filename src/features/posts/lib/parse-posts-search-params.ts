import type { GetPostsParams } from "@/features/posts/types";

function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseUserId(value: string | undefined): number | undefined {
  if (!value || !/^\d+$/.test(value)) {
    return undefined;
  }

  const userId = Number(value);

  if (!Number.isSafeInteger(userId) || userId < 1) {
    return undefined;
  }

  return userId;
}

export function parsePostsSearchParams(
  searchParams: Record<string, string | string[] | undefined> = {},
): GetPostsParams {
  const filters: GetPostsParams = {};
  const query = getSingleParam(searchParams.query)?.trim();
  const userId = parseUserId(getSingleParam(searchParams.userId));

  if (query) {
    filters.query = query;
  }

  if (userId !== undefined) {
    filters.userId = userId;
  }

  return filters;
}
