"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { getUserAvatarUrl } from "@/features/albums/api";

import { logoutAction } from "../actions";
import { selectAuthUser, useAuthStore } from "../store";
import { UserAvatar } from "./user-avatar";

export function UserAccountMenu() {
  const router = useRouter();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const signOutRef = useRef<HTMLButtonElement>(null);

  const user = useAuthStore(selectAuthUser);
  const clearAuthState = useAuthStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: avatarUrl } = useQuery({
    queryKey: ["user-avatar", user?.id],
    queryFn: () => getUserAvatarUrl(user!.id),
    enabled: Boolean(user),
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    signOutRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  if (!user) {
    return null;
  }

  async function handleSignOut() {
    setErrorMessage(null);
    setIsSigningOut(true);

    try {
      await logoutAction();
      clearAuthState();
      setIsOpen(false);
      router.replace("/login");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign out.");
      setIsSigningOut(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={menuButtonRef}
        type="button"
        className="flex items-center gap-2 rounded-full p-0.5 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        aria-label={`Account menu for ${user.name}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <UserAvatar
          key={avatarUrl ?? `initials-${user.id}`}
          user={user}
          avatarUrl={avatarUrl}
        />
        <span className="hidden max-w-[8rem] truncate text-sm font-medium text-zinc-700 sm:inline dark:text-zinc-300">
          {user.name.split(" ")[0]}
        </span>
        <span
          aria-hidden="true"
          className={[
            "hidden text-zinc-400 transition-transform sm:inline",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        >
          ▾
        </span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Account options"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <UserAvatar
                key={`menu-${avatarUrl ?? user.id}`}
                user={user}
                avatarUrl={avatarUrl}
                size="md"
                ringClassName=""
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {user.name}
                </p>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                  @{user.username}
                </p>
              </div>
            </div>
            <p className="mt-2 truncate text-xs text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>

          <div className="p-1.5">
            <button
              ref={signOutRef}
              type="button"
              role="menuitem"
              disabled={isSigningOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/40 dark:focus-visible:ring-red-900"
              onClick={handleSignOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </div>

          {errorMessage ? (
            <p
              className="border-t border-zinc-200 px-4 py-2 text-xs text-red-600 dark:border-zinc-800 dark:text-red-400"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
