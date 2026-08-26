"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { buildPostsListUrl } from "@/features/posts/lib/build-posts-list-url";

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

  const pageHref = (nextPage: number) =>
    buildPostsListUrl({
      pathname,
      searchParams,
      page: nextPage,
    });

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
          <Link
            href={pageHref(page - 1)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Previous
          </Link>
        ) : (
          <span className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
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
                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-zinc-950 px-3 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    href={pageHref(pageNumber)}
                    className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {pageNumber}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {page < totalPages ? (
          <Link
            href={pageHref(page + 1)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Next
          </Link>
        ) : (
          <span className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
