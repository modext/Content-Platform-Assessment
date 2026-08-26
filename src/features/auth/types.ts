import type { User } from "@/features/users/types";

/** Session-scoped user profile — omits JSONPlaceholder fields not needed for auth UI. */
export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

export type LoginResult =
  { success: true; user: AuthUser } | { success: false; message: string };

export function toAuthUser(
  user: Pick<User, "id" | "name" | "username" | "email">,
): AuthUser {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
  };
}
