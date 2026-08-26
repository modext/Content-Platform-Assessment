const DEFAULT_AUTHENTICATED_PATH = "/dashboard";

/** Prevents open redirects — only same-origin relative paths are allowed. */
export function getSafeRedirectPath(path: string | null | undefined): string {
  return path?.startsWith("/") && !path.startsWith("//")
    ? path
    : DEFAULT_AUTHENTICATED_PATH;
}
