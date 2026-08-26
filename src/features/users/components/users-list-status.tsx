"use client";

import { Button } from "@/components/ui/button";

interface UsersListStatusProps {
  message: string;
  onRetry?: () => void;
}

export function UsersListPending() {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading users...</p>
  );
}

export function UsersListError({ message, onRetry }: UsersListStatusProps) {
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
