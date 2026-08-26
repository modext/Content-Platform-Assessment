import { Skeleton } from "@/components/ui/skeleton";

export default function UserProfileLoading() {
  return (
    <section aria-label="Loading user profile" className="space-y-8">
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-64 max-w-full" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="space-y-3 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-52" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-32" />
        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className="space-y-2 py-4 first:pt-0 last:pb-0">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
