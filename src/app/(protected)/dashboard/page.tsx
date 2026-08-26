import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | Content Platform",
};

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Explore and manage content from one workspace.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Posts</CardTitle>
          <CardDescription>
            Browse content from JSONPlaceholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/posts" className="text-sm font-medium underline">
            View posts
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
