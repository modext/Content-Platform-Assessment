"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PostsError({ error, reset }: PostsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Posts
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover content published across the platform.
        </p>
      </div>

      <Card className="max-w-xl" role="alert">
        <CardHeader>
          <CardTitle>Unable to load posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Something went wrong while loading the content feed. Please try
            again.
          </p>
          <Button onClick={reset}>Try again</Button>
        </CardContent>
      </Card>
    </section>
  );
}
