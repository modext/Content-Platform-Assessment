import axios from "axios";

export type ApiErrorKind =
  "HTTP_ERROR" | "NETWORK_ERROR" | "TIMEOUT_ERROR" | "UNKNOWN_ERROR";

interface ApiErrorOptions {
  kind: ApiErrorKind;
  status?: number;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.kind = options.kind;
    this.status = options.status;
  }
}

function getResponseMessage(data: unknown): string | undefined {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return undefined;
}

function getHttpErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "The request was invalid.";
    case 401:
      return "You need to sign in to continue.";
    case 403:
      return "You do not have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 429:
      return "Too many requests. Please try again shortly.";
    default:
      return status >= 500
        ? "The service is temporarily unavailable."
        : "The request could not be completed.";
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return new ApiError("The request timed out. Please try again.", {
        kind: "TIMEOUT_ERROR",
        cause: error,
      });
    }

    if (!error.response) {
      return new ApiError("Unable to connect to the service.", {
        kind: "NETWORK_ERROR",
        cause: error,
      });
    }

    const status = error.response.status;

    return new ApiError(
      getResponseMessage(error.response.data) ?? getHttpErrorMessage(status),
      {
        kind: "HTTP_ERROR",
        status,
        cause: error,
      },
    );
  }

  return new ApiError(
    error instanceof Error ? error.message : "An unexpected error occurred.",
    {
      kind: "UNKNOWN_ERROR",
      cause: error,
    },
  );
}
