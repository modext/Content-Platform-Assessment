"use client";

import { useUsers } from "@/features/users/hooks";

import { UsersListView } from "./users-list-view";
import { UsersListError, UsersListPending } from "./users-list-status";

export function UsersList() {
  const { data, isPending, isError, refetch } = useUsers();

  if (isPending) {
    return <UsersListPending />;
  }

  if (isError) {
    return (
      <UsersListError
        message="Unable to load users. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return <UsersListView users={data} />;
}
