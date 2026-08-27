import axios from "axios";

import { getApiBaseUrl } from "@/config/env";

import { normalizeApiError } from "./api-error";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    throw normalizeApiError(error);
  },
);
