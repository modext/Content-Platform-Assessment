"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

import {
  buildPostsListUrl,
  parsePostsListParamsFromSearchParams,
  updatePostsListParams,
} from "@/features/posts/lib/parse-posts-list-params";

const selectClassName =
  "flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition-colors focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-800 sm:max-w-xs";

export interface PostsAuthorOption {
  id: number;
  name: string;
}

interface PostsAuthorFilterProps {
  authors: PostsAuthorOption[];
  authorsUnavailable?: boolean;
}

export function PostsAuthorFilter({
  authors,
  authorsUnavailable = false,
}: PostsAuthorFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters } = parsePostsListParamsFromSearchParams(searchParams);
  const selectedUserId =
    filters.userId !== undefined ? String(filters.userId) : "";

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const current = parsePostsListParamsFromSearchParams(searchParams);
    const nextUserId = event.target.value;
    const next = updatePostsListParams(current, {
      userId: nextUserId ? Number(nextUserId) : null,
    });

    router.push(buildPostsListUrl(pathname, next));
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor="posts-author-filter"
        className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
      >
        Author
      </label>
      <select
        id="posts-author-filter"
        name="userId"
        value={selectedUserId}
        onChange={handleChange}
        className={selectClassName}
        disabled={authorsUnavailable}
        aria-describedby={
          authorsUnavailable ? "posts-author-filter-status" : undefined
        }
      >
        <option value="">All authors</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      {authorsUnavailable ? (
        <p
          id="posts-author-filter-status"
          className="text-xs text-zinc-500 dark:text-zinc-400"
          role="status"
        >
          Author list is temporarily unavailable.
        </p>
      ) : null}
    </div>
  );
}
