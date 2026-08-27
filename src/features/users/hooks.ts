"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getUserAvatarUrlMap } from "@/features/albums/api";

import { userQueries } from "./queries";
import type { User } from "./types";

export function useUsers() {
  return useQuery(userQueries.list());
}

export function useUser(userId: User["id"]) {
  return useQuery(userQueries.detail(userId));
}

export function useUserAvatarMap(userIds: number[]) {
  const stableUserIds = useMemo(
    () => [...new Set(userIds)].sort((a, b) => a - b),
    [userIds],
  );

  return useQuery({
    queryKey: ["user-avatars", stableUserIds],
    queryFn: () => getUserAvatarUrlMap(stableUserIds),
    enabled: stableUserIds.length > 0,
    staleTime: 1000 * 60 * 30,
  });
}
