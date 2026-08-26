import { notFound } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;

  if (!/^\d+$/.test(postId) || Number(postId) < 1) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Post {postId}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Post details
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content preview</CardTitle>
          <CardDescription>
            This route is ready to receive data from the posts feature.
          </CardDescription>
        </CardHeader>
      </Card>
    </article>
  );
}
