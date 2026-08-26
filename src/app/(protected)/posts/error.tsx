"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PostsErrorProps {
  reset: () => void;
}

export default function PostsError({ reset }: PostsErrorProps) {
  return (
    <Card className="mx-auto max-w-xl" role="alert">
      <CardHeader>
        <CardTitle>Unable to load posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Something went wrong while loading the content feed. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </CardContent>
    </Card>
  );
}
