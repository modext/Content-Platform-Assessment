import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { SkipToMain } from "./skip-to-main";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <SkipToMain />
      <AppHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-8 focus:outline-none sm:px-6 lg:px-8"
      >
        {children}
      </main>
    </div>
  );
}
