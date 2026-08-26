import "server-only";

import { getUsers } from "@/features/users/api";
import { normalizeApiError } from "@/lib/api-error";

import { MOCK_PASSWORD } from "./constants";
import { AuthError } from "./errors";
import { toAuthUser, type AuthUser } from "./types";

export async function authenticateUser(
  email: string,
  password: string,
): Promise<AuthUser> {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password.trim()) {
    throw new AuthError("Email and password are required.");
  }

  if (password !== MOCK_PASSWORD) {
    throw new AuthError("Invalid email or password.");
  }

  try {
    const users = await getUsers();
    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail,
    );

    if (!matchedUser) {
      throw new AuthError("Invalid email or password.");
    }

    return toAuthUser(matchedUser);
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }

    throw normalizeApiError(error);
  }
}
