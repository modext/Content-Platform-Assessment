import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Comment } from "@/features/comments/types";
import type { User } from "@/features/users/types";

import type { Post } from "../types";
import { PostAuthorCard } from "./post-author-card";
import { PostCommentsList } from "./post-comments-list";

interface PostDetailViewProps {
  post: Post;
  author: User;
  comments: Comment[];
}

export function PostDetailView({
  post,
  author,
  comments,
}: PostDetailViewProps) {
  return (
    <article className="space-y-8">
      <div className="space-y-4">
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to posts
        </Link>
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Post #{post.id}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Full post body</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                {post.body}
              </p>
            </CardContent>
          </Card>

          <PostCommentsList comments={comments} />
        </div>

        <aside className="lg:sticky lg:top-8">
          <PostAuthorCard author={author} />
        </aside>
      </div>
    </article>
  );
}
