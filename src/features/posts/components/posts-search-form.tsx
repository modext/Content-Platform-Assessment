"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import {
  buildPostsListUrl,
  parsePostsListParamsFromSearchParams,
  updatePostsListParams,
} from "@/features/posts/lib/parse-posts-list-params";

const inputClassName =
  "flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-800";

interface PostsSearchFormFieldsProps {
  initialQuery: string;
}

function PostsSearchFormFields({ initialQuery }: PostsSearchFormFieldsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  function navigateWithParams(update: { query: string | null }) {
    const current = parsePostsListParamsFromSearchParams(searchParams);
    const next = updatePostsListParams(current, update);

    router.push(buildPostsListUrl(pathname, next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateWithParams({ query: query.trim() || null });
  }

  function handleClear() {
    setQuery("");
    navigateWithParams({ query: null });
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="posts-search">
        Search posts
      </label>
      <input
        id="posts-search"
        name="query"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title or body..."
        className={inputClassName}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Search
        </button>
        {initialQuery ? (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Clear
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function PostsSearchForm() {
  const searchParams = useSearchParams();
  const queryFromUrl =
    parsePostsListParamsFromSearchParams(searchParams).filters.query ?? "";

  return (
    <PostsSearchFormFields key={queryFromUrl} initialQuery={queryFromUrl} />
  );
}
