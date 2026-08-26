import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostLoading() {
  return (
    <article aria-label="Loading post" className="space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-56" />
      </div>
      <Card className="space-y-4 p-6">
        <Skeleton className="h-7 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </Card>
    </article>
  );
}
