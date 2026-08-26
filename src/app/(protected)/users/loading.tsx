import { Skeleton } from "@/components/ui/skeleton";

export default function UsersLoading() {
  return (
    <section aria-label="Loading users" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="space-y-2 py-4 first:pt-0 last:pb-0">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </li>
        ))}
      </ul>
    </section>
  );
}
