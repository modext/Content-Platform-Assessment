import type { Metadata } from "next";

import { PostsListSection } from "@/features/posts/components/posts-list-section";
import { PostsPageHeader } from "@/features/posts/components/posts-page-header";

export const metadata: Metadata = {
  title: "Posts | Content Platform",
};

export default function PostsPage() {
  return (
    <section className="space-y-6">
      <PostsPageHeader />
      <PostsListSection />
    </section>
  );
}
