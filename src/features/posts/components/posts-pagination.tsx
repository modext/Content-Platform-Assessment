"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import {
  buildPostsListUrl,
  parsePostsListParamsFromSearchParams,
  updatePostsListParams,
} from "@/features/posts/lib/parse-posts-list-params";

const paginationLinkClassName =
  "inline-flex h-10 min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950";

const paginationPageLinkClassName =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950";

interface PostsPaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
}

export function PostsPagination({
  page,
  totalPages,
  totalItems,
}: PostsPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  const pageHref = (nextPage: number) => {
    const current = parsePostsListParamsFromSearchParams(searchParams);
    const next = updatePostsListParams(current, { page: nextPage });

    return buildPostsListUrl(pathname, next);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Posts pagination"
      className="flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {page} of {totalPages} ({totalItems} posts)
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {page > 1 ? (
          <Link href={pageHref(page - 1)} className={paginationLinkClassName}>
            Previous
          </Link>
        ) : (
          <span className="inline-flex h-10 min-h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
            Previous
          </span>
        )}

        <ul className="flex flex-wrap items-center gap-1">
          {pages.map((pageNumber) => {
            const isCurrentPage = pageNumber === page;

            return (
              <li key={pageNumber}>
                {isCurrentPage ? (
                  <span
                    aria-current="page"
                    className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-zinc-950 px-3 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    href={pageHref(pageNumber)}
                    className={paginationPageLinkClassName}
                  >
                    {pageNumber}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {page < totalPages ? (
          <Link href={pageHref(page + 1)} className={paginationLinkClassName}>
            Next
          </Link>
        ) : (
          <span className="inline-flex h-10 min-h-10 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
