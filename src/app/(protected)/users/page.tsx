import type { Metadata } from "next";

import { UsersListSection } from "@/features/users/components/users-list-section";
import { UsersPageHeader } from "@/features/users/components/users-page-header";

export const metadata: Metadata = {
  title: "Users | Content Platform",
};

export default function UsersPage() {
  return (
    <section className="space-y-6">
      <UsersPageHeader />
      <UsersListSection />
    </section>
  );
}
