const DEFAULT_API_BASE_URL = "https://jsonplaceholder.typicode.com";
const DEVELOPMENT_AUTH_SECRET =
  "development-only-auth-secret-change-before-deployment";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;

  if (secret) {
    if (secret.length < 32) {
      throw new Error("AUTH_SECRET must contain at least 32 characters.");
    }

    return secret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTH_SECRET is required in production.");
  }

  return DEVELOPMENT_AUTH_SECRET;
}
