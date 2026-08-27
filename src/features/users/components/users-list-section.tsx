import { Suspense } from "react";

import { HydrationBoundary } from "@tanstack/react-query";

import { prefetchUsersList } from "@/features/users/server/prefetch-users-list";

import { UsersList } from "./users-list.client";
import { ListLoadingMessage } from "@/components/ui/list-loading-message";

export async function UsersListSection() {
  const dehydratedState = await prefetchUsersList();

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<ListLoadingMessage noun="users" />}>
        <UsersList />
      </Suspense>
    </HydrationBoundary>
  );
}
