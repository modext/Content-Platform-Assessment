import { apiClient } from "@/lib/axios";

import type { User } from "./types";

export async function getUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>("/users");

  return response.data;
}

export async function getUser(userId: User["id"]): Promise<User> {
  const response = await apiClient.get<User>("/users/" + userId);

  return response.data;
}
