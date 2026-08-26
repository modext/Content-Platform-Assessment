import type { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Posts | Content Platform",
};

export default function PostsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Posts
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover content published across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content feed</CardTitle>
          <CardDescription>
            Post data will be connected through the posts feature.
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
