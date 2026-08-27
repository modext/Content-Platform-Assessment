"use client";

import { useMemo } from "react";

import { ListLoadingMessage } from "@/components/ui/list-loading-message";
import { QueryRetryAlert } from "@/components/ui/query-retry-alert";
import { useUserAvatarMap, useUsers } from "@/features/users/hooks";

import { UsersListView } from "./users-list-view";

export function UsersList() {
  const { data, isPending, isError, refetch } = useUsers();
  const userIds = useMemo(() => data?.map((user) => user.id) ?? [], [data]);
  const { data: avatarUrls } = useUserAvatarMap(userIds);

  if (isPending) {
    return <ListLoadingMessage noun="users" />;
  }

  if (isError) {
    return (
      <QueryRetryAlert
        message="Unable to load users. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return <UsersListView users={data} avatarUrls={avatarUrls} />;
}
