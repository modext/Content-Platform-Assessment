import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreatePostForm } from "@/features/posts/components/create-post-form";

export const metadata: Metadata = {
  title: "New post | Content Platform",
};

export default function NewPostPage() {
  return (
    <section className="space-y-6">
      <div>
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
        >
          ← Back to posts
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          New post
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Create a new entry. JSONPlaceholder simulates the write — the post
          will appear in your local list after submission.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post details</CardTitle>
          <CardDescription>
            Title and body are sent to the API. The signed-in user is set as the
            author.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePostForm />
        </CardContent>
      </Card>
    </section>
  );
}
