import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { AuthSessionHydrator } from "@/features/auth/auth-session-hydrator";
import { getSession } from "@/features/auth/dal";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <AuthSessionHydrator user={session.user} />
      <AppShell>{children}</AppShell>
    </>
  );
}
