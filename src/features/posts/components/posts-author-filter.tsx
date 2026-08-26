"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";

import { resetPostsPageParam } from "@/features/posts/lib/build-posts-list-url";

const selectClassName =
  "flex h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none transition-colors focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-800 sm:max-w-xs";

export interface PostsAuthorOption {
  id: number;
  name: string;
}

interface PostsAuthorFilterProps {
  authors: PostsAuthorOption[];
}

export function PostsAuthorFilter({ authors }: PostsAuthorFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get("userId") ?? "";

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const params = resetPostsPageParam(searchParams);
    const nextUserId = event.target.value;

    if (nextUserId) {
      params.set("userId", nextUserId);
    } else {
      params.delete("userId");
    }

    const nextSearch = params.toString();
    router.push(nextSearch ? `${pathname}?${nextSearch}` : pathname);
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
      >
        <option value="">All authors</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
}
