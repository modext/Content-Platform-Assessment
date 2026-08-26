import type { User } from "@/features/users/types";

export function parseUserId(value: string): User["id"] | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id) || id < 1) {
    return null;
  }

  return id;
}
