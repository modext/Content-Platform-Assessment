"use client";

import { create } from "zustand";

import type { AuthUser } from "./types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const initialState = {
  user: null,
  isAuthenticated: false,
} as const;

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,

  login: (user) => {
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    set(initialState);
  },
}));

export const selectAuthUser = (state: AuthState) => state.user;

export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
