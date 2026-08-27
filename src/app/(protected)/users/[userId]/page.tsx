import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostsListView } from "@/features/posts/components/posts-list-view";
import { UserProfileCard } from "@/features/users/components/user-profile-card";
import { getUser } from "@/features/users/api";
import { parseUserId } from "@/features/users/lib/parse-user-id";
import { getUserProfile } from "@/features/users/server/get-user-profile";
import { ApiError } from "@/lib/api-error";

interface UserPageProps {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { userId } = await params;
  const parsedUserId = parseUserId(userId);

  if (!parsedUserId) {
    return { title: "User not found | Content Plat4m" };
  }

  try {
    const user = await getUser(parsedUserId);

    return {
      title: `${user.name} | Content Plat4m`,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "User not found | Content Plat4m" };
    }

    return { title: "User | Content Plat4m" };
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const { userId } = await params;
  const parsedUserId = parseUserId(userId);

  if (!parsedUserId) {
    notFound();
  }

  const { user, posts } = await getUserProfile(parsedUserId);

  return (
    <article className="space-y-8">
      <div>
        <Link
          href="/users"
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          ← Back to users
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {user.name}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Profile and posts authored on the platform.
        </p>
      </div>

      <UserProfileCard user={user} />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Authored posts
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {posts.length === 1 ? "1 post" : `${posts.length} posts`} by{" "}
            {user.name}
          </p>
        </div>
        <PostsListView
          posts={posts}
          emptyState={{
            title: "No authored posts",
            description: `${user.name} has not published any posts in this feed yet.`,
            action: { label: "Browse all posts", href: "/posts" },
          }}
        />
      </section>
    </article>
  );
}
