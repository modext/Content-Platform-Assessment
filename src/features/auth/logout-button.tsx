"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { logoutAction } from "./actions";
import { useAuthStore } from "./store";

export function LogoutButton() {
  const router = useRouter();
  const clearAuthState = useAuthStore((state) => state.logout);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await logoutAction();
      clearAuthState();
      router.replace("/login");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign out.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full items-center gap-2 px-1">
      <Button
        variant="ghost"
        className="w-full justify-start md:w-auto md:justify-center"
        onClick={handleLogout}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing out..." : "Sign out"}
      </Button>
      {errorMessage ? (
        <span className="text-xs text-red-600" role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
