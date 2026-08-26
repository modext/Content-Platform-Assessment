function getSingleParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePostsPage(
  searchParams: Record<string, string | string[] | undefined> = {},
): number {
  const raw = getSingleParam(searchParams.page);

  if (!raw || !/^\d+$/.test(raw)) {
    return 1;
  }

  const page = Number(raw);

  if (!Number.isSafeInteger(page) || page < 1) {
    return 1;
  }

  return page;
}
