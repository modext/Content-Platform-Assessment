import type { GetPostsParams } from "@/features/posts/types";

export type PostsSearchParamsInput = Record<
  string,
  string | string[] | undefined
>;

export interface PostsListParams {
  filters: GetPostsParams;
  page: number;
}

export interface PostsListParamsUpdate {
  query?: string | null;
  userId?: number | null;
  page?: number | null;
}

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

function parsePage(value: string | undefined): number {
  if (!value || !/^\d+$/.test(value)) {
    return 1;
  }

  const page = Number(value);

  if (!Number.isSafeInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

/** Single parser for query, userId, and page URL params. */
export function parsePostsListParams(
  searchParams: PostsSearchParamsInput = {},
): PostsListParams {
  const filters: GetPostsParams = {};
  const query = getSingleParam(searchParams.query)?.trim();
  const userId = parseUserId(getSingleParam(searchParams.userId));

  if (query) {
    filters.query = query;
  }

  if (userId !== undefined) {
    filters.userId = userId;
  }

  return {
    filters,
    page: parsePage(getSingleParam(searchParams.page)),
  };
}

export function parsePostsListParamsFromSearchParams(
  searchParams: URLSearchParams,
): PostsListParams {
  return parsePostsListParams(Object.fromEntries(searchParams.entries()));
}

/** API/query layer — excludes page because pagination is a view concern. */
export function parsePostsSearchParams(
  searchParams: PostsSearchParamsInput = {},
): GetPostsParams {
  return parsePostsListParams(searchParams).filters;
}

export function updatePostsListParams(
  current: PostsListParams,
  update: PostsListParamsUpdate,
): PostsListParams {
  const filters = { ...current.filters };
  const filterChanged =
    update.query !== undefined || update.userId !== undefined;

  if (update.query !== undefined) {
    const trimmedQuery = update.query?.trim();

    if (trimmedQuery) {
      filters.query = trimmedQuery;
    } else {
      delete filters.query;
    }
  }

  if (update.userId !== undefined) {
    if (update.userId === null) {
      delete filters.userId;
    } else {
      filters.userId = update.userId;
    }
  }

  let page = current.page;

  if (update.page !== undefined) {
    page = update.page === null || update.page <= 1 ? 1 : update.page;
  } else if (filterChanged) {
    page = 1;
  }

  return { filters, page };
}

export function serializePostsListParams({
  filters,
  page,
}: PostsListParams): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("query", filters.query);
  }

  if (filters.userId !== undefined) {
    params.set("userId", String(filters.userId));
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  return params;
}

export function buildPostsListUrl(
  pathname: string,
  listParams: PostsListParams,
): string {
  const search = serializePostsListParams(listParams).toString();

  return search ? `${pathname}?${search}` : pathname;
}
