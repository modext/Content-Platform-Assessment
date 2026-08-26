import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PostNotFound() {
  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Post not found
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          The post you requested does not exist, or the URL contains an invalid
          post identifier.
        </p>
      </div>

      <Card role="alert">
        <CardHeader>
          <CardTitle>What you can do</CardTitle>
          <CardDescription>
            Return to the posts feed or open the dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link
            href="/posts"
            className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
          >
            Back to posts
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-zinc-600 underline underline-offset-4 dark:text-zinc-400"
          >
            Go to dashboard
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
