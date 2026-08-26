import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PostNotFound() {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>Post not found</CardTitle>
        <CardDescription>
          The requested post does not exist or its identifier is invalid.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          Return to posts
        </Link>
      </CardContent>
    </Card>
  );
}
