"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { LogoutButton } from "@/features/auth/logout-button";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/posts", label: "Posts" },
  { href: "/users", label: "Users" },
] as const;

function isActiveRoute(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClassName(isActive: boolean) {
  return [
    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950",
    isActive
      ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
  ].join(" ");
}

export function AppNavigation() {
  const pathname = usePathname();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleDismissMenu() {
    setIsOpen(false);
    menuButtonRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstMenuItemRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav aria-label="Primary navigation" className="hidden md:block">
        <ul className="flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = isActiveRoute(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={navLinkClassName(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>

      <div className="md:hidden">
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus-visible:ring-offset-zinc-950"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span aria-hidden="true" className="relative block h-3.5 w-4">
            <span
              className={[
                "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform",
                isOpen ? "top-1.5 rotate-45" : "top-0",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-1.5 block h-0.5 w-4 rounded-full bg-current transition-opacity",
                isOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 block h-0.5 w-4 rounded-full bg-current transition-transform",
                isOpen ? "top-1.5 -rotate-45" : "top-3",
              ].join(" ")}
            />
          </span>
        </button>

        {isOpen ? (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 top-16 z-40 bg-zinc-950/40"
              onClick={handleDismissMenu}
            />
            <nav
              id={menuId}
              aria-label="Primary navigation"
              className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
            >
              <ul className="space-y-1">
                {navigation.map((item, index) => {
                  const isActive = isActiveRoute(pathname, item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstMenuItemRef : undefined}
                        href={item.href}
                        className={navLinkClassName(isActive)}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                  <LogoutButton />
                </li>
              </ul>
            </nav>
          </>
        ) : null}
      </div>
    </>
  );
}
