import { describe, expect, it, beforeEach } from "vitest";

import { selectAuthUser, selectIsAuthenticated, useAuthStore } from "./store";
import type { AuthUser } from "./types";

const mockUser: AuthUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
};

function resetAuthStore() {
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
  });
}

describe("useAuthStore", () => {
  beforeEach(() => {
    resetAuthStore();
  });

  it("starts unauthenticated with no user", () => {
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("login stores the user and marks the session authenticated", () => {
    useAuthStore.getState().login(mockUser);

    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it("logout clears the user and authentication flag", () => {
    useAuthStore.getState().login(mockUser);

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("selectAuthUser returns the current user", () => {
    useAuthStore.getState().login(mockUser);

    expect(selectAuthUser(useAuthStore.getState())).toEqual(mockUser);
  });

  it("selectIsAuthenticated reflects login and logout transitions", () => {
    expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false);

    useAuthStore.getState().login(mockUser);

    expect(selectIsAuthenticated(useAuthStore.getState())).toBe(true);

    useAuthStore.getState().logout();

    expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false);
  });
});
