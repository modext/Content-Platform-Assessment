import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <article aria-label="Loading post" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-full max-w-2xl" />
      </div>

      <Card className="space-y-4 p-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </Card>

      <Card className="space-y-4 p-6">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-56" />
      </Card>

      <Card className="space-y-4 p-6">
        <Skeleton className="h-6 w-28" />
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="space-y-2 border-t border-zinc-200 pt-4 first:border-t-0 first:pt-0 dark:border-zinc-800"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </Card>
    </article>
  );
}
