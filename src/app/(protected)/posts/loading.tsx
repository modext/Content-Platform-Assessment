import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <section aria-label="Loading posts" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-36" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Card key={index} className="space-y-4 p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </Card>
        ))}
      </div>
    </section>
  );
}
