import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";

import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  type AuthSession,
} from "./session";

export const getSession = cache(async (): Promise<AuthSession | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return verifySessionToken(token);
});
