import type { Metadata } from "next";

import { PostsListSection } from "@/features/posts/components/posts-list-section";
import { PostsPageHeader } from "@/features/posts/components/posts-page-header";
import { parsePostsListParams } from "@/features/posts/lib/parse-posts-list-params";

export const metadata: Metadata = {
  title: "Posts | Content Platform",
};

interface PostsPageProps {
  searchParams: Promise<{
    query?: string | string[];
    userId?: string | string[];
    page?: string | string[];
  }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { filters } = parsePostsListParams(await searchParams);

  return (
    <section className="space-y-6">
      <PostsPageHeader />
      <PostsListSection filters={filters} />
    </section>
  );
}
