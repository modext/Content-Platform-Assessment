import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/login-form";
import { getSafeRedirectPath } from "@/features/auth/redirect";

export const metadata: Metadata = {
  title: "Sign in | Content Platform",
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string | string[] }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const nextPath = Array.isArray(next) ? next[0] : next;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Sign in with a JSONPlaceholder account to access the workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={getSafeRedirectPath(nextPath)} />
        </CardContent>
      </Card>
    </main>
  );
}
