import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <section aria-label="Loading posts" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="mt-2 h-4 w-72" />
        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <li
            key={index}
            className="space-y-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </li>
        ))}
      </ul>
    </section>
  );
}
