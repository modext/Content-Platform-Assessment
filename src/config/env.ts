const DEFAULT_API_BASE_URL = "https://jsonplaceholder.typicode.com";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}
