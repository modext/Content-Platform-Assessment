import Link from "next/link";

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
    <article className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-600 underline underline-offset-4 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Back to posts
        </Link>
        <div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Post #{post.id}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {post.title}
          </h1>
        </div>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
          {post.body}
        </p>
      </section>

      <PostAuthorCard author={author} />
      <PostCommentsList comments={comments} />
    </article>
  );
}
