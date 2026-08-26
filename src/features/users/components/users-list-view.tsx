import Link from "next/link";

import type { User } from "@/features/users/types";

interface UsersListViewProps {
  users: User[];
}

export function UsersListView({ users }: UsersListViewProps) {
  if (users.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        No users found.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
      {users.map((user) => (
        <li key={user.id} className="py-4 first:pt-0 last:pb-0">
          <h2 className="text-base font-medium text-zinc-950 dark:text-zinc-50">
            <Link
              href={`/users/${user.id}`}
              className="underline-offset-4 transition-colors hover:underline"
            >
              {user.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            @{user.username} · {user.email}
          </p>
          {user.company.name ? (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
              {user.company.name}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
