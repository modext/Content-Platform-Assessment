import type { User } from "@/features/users/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>@{user.username}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p className="text-zinc-600 dark:text-zinc-400">{user.email}</p>
        <p className="text-zinc-600 dark:text-zinc-400">{user.phone}</p>
        {user.website ? (
          <p className="text-zinc-600 dark:text-zinc-400">{user.website}</p>
        ) : null}
        <p className="text-zinc-600 dark:text-zinc-400">
          {user.address.city}, {user.address.zipcode}
        </p>
        {user.company.name ? (
          <p className="font-medium text-zinc-950 dark:text-zinc-50">
            {user.company.name}
          </p>
        ) : null}
        {user.company.catchPhrase ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            {user.company.catchPhrase}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
