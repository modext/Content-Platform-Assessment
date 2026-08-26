"use client";

import { useEffect } from "react";

import { useAuthStore } from "./store";
import type { AuthUser } from "./types";

interface AuthSessionHydratorProps {
  user: AuthUser;
}

export function AuthSessionHydrator({ user }: AuthSessionHydratorProps) {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    login(user);
  }, [login, user]);

  return null;
}
