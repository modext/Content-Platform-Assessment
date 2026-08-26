import Link from "next/link";

import { AppNavigation } from "./app-navigation";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="rounded-lg font-semibold tracking-tight text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:text-zinc-50 dark:focus-visible:ring-offset-zinc-950"
        >
          Content Platform
        </Link>

        <AppNavigation />
      </div>
    </header>
  );
}
