import type { User } from "@/features/users/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <CardContent className="space-y-1 text-sm">
        <p className="font-medium text-zinc-950 dark:text-zinc-50">
          {author.name}
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
