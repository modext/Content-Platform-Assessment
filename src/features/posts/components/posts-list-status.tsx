"use client";

import { Button } from "@/components/ui/button";

interface PostsListStatusProps {
  message: string;
  onRetry?: () => void;
}

export function PostsListPending() {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading posts...</p>
  );
}

export function PostsListError({ message, onRetry }: PostsListStatusProps) {
  return (
    <div className="space-y-3" role="alert">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{message}</p>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
