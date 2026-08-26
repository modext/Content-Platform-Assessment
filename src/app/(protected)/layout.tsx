import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
