import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "@/features/users/types";

interface PostAuthorCardProps {
  author: User;
}

export function PostAuthorCard({ author }: PostAuthorCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Author</CardTitle>
        <CardDescription>Published by</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-base font-medium text-zinc-950 dark:text-zinc-50">
          <Link
            href={`/users/${author.id}`}
            className="underline-offset-4 transition-colors hover:underline"
          >
            {author.name}
          </Link>
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">@{author.username}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{author.email}</p>
        {author.website ? (
          <p className="text-zinc-600 dark:text-zinc-400">{author.website}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
