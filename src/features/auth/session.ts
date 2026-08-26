import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { getAuthSecret } from "@/config/env";

import type { AuthUser } from "./types";

export const SESSION_COOKIE_NAME = "content-platform-session";

const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export interface AuthSession {
  user: AuthUser;
  expiresAt: number;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

function createSignature(payload: string): string {
  return createHmac("sha256", getAuthSecret())
    .update(payload)
    .digest("base64url");
}

function isAuthUser(value: unknown): value is AuthUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "username" in value &&
    typeof value.username === "string" &&
    "email" in value &&
    typeof value.email === "string"
  );
}

function isAuthSession(value: unknown): value is AuthSession {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "user" in value &&
    isAuthUser(value.user) &&
    "expiresAt" in value &&
    typeof value.expiresAt === "number"
  );
}

export function createSessionToken(user: AuthUser): string {
  const session: AuthSession = {
    user,
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1_000,
  };
  const payload = Buffer.from(JSON.stringify(session), "utf8").toString(
    "base64url",
  );

  return payload + "." + createSignature(payload);
}

export function verifySessionToken(
  token: string | undefined,
): AuthSession | null {
  if (!token) {
    return null;
  }

  const [payload, signature, ...unexpectedParts] = token.split(".");

  if (!payload || !signature || unexpectedParts.length > 0) {
    return null;
  }

  try {
    const providedSignature = Buffer.from(signature, "base64url");
    const expectedSignature = Buffer.from(
      createSignature(payload),
      "base64url",
    );

    if (
      providedSignature.length !== expectedSignature.length ||
      !timingSafeEqual(providedSignature, expectedSignature)
    ) {
      return null;
    }

    const decoded: unknown = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );

    if (!isAuthSession(decoded) || decoded.expiresAt <= Date.now()) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
