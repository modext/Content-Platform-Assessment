import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <section aria-label="Loading posts" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="space-y-2 py-4 first:pt-0 last:pb-0">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </li>
        ))}
      </ul>
    </section>
  );
}
