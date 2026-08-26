"use client";

import { useQuery } from "@tanstack/react-query";

import { userQueries } from "./queries";
import type { User } from "./types";

export function useUsers() {
  return useQuery(userQueries.list());
}

export function useUser(userId: User["id"]) {
  return useQuery(userQueries.detail(userId));
}
