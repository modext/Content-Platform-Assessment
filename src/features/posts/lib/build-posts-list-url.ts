interface BuildPostsListUrlOptions {
  pathname: string;
  searchParams: URLSearchParams;
  page?: number | null;
}

/** Builds a /posts URL, preserving query and userId. Omits page=1 from the URL. */
export function buildPostsListUrl({
  pathname,
  searchParams,
  page,
}: BuildPostsListUrlOptions): string {
  const params = new URLSearchParams(searchParams.toString());

  if (page === null || page === undefined || page <= 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }

  const search = params.toString();

  return search ? `${pathname}?${search}` : pathname;
}

/** Removes page from URL — used when search or author filters change. */
export function resetPostsPageParam(
  searchParams: URLSearchParams,
): URLSearchParams {
  const params = new URLSearchParams(searchParams.toString());
  params.delete("page");

  return params;
}
