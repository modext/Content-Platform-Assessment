"use server";

import { cookies } from "next/headers";

import { ApiError } from "@/lib/api-error";

import { authenticateUser } from "./api";
import { AuthError } from "./errors";
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from "./session";
import type { LoginResult } from "./types";

export async function loginAction(
  email: string,
  password: string,
): Promise<LoginResult> {
  try {
    const user = await authenticateUser(email, password);
    const cookieStore = await cookies();

    cookieStore.set(
      SESSION_COOKIE_NAME,
      createSessionToken(user),
      getSessionCookieOptions(),
    );

    return { success: true, user };
  } catch (error) {
    if (error instanceof AuthError || error instanceof ApiError) {
      return { success: false, message: error.message };
    }

    return {
      success: false,
      message: "Unable to sign in. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
