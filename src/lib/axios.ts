import axios from "axios";

import { getApiBaseUrl } from "@/config/env";

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});
