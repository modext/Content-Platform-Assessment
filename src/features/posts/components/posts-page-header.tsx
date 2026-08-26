import Link from "next/link";

export function PostsPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Posts
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover content published across the platform.
        </p>
      </div>
      <Link
        href="/posts/new"
        className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        New post
      </Link>
    </div>
  );
}
