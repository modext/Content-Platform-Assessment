"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { selectAuthUser, useAuthStore } from "@/features/auth/store";
import { ApiError } from "@/lib/api-error";

import { useCreatePost } from "../hooks";

const fieldClassName =
  "flex w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-800";

export function CreatePostForm() {
  const router = useRouter();
  const user = useAuthStore(selectAuthUser);
  const createPostMutation = useCreatePost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setValidationError("Title and body are required.");
      return;
    }

    if (!user) {
      setValidationError("You must be signed in to create a post.");
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        title: trimmedTitle,
        body: trimmedBody,
        userId: user.id,
      });

      router.push("/posts");
      router.refresh();
    } catch {
      // Mutation error is rendered below.
    }
  }

  const mutationError = createPostMutation.error;
  const errorMessage =
    validationError ??
    (mutationError instanceof ApiError
      ? mutationError.message
      : mutationError
        ? "Unable to create the post. Please try again."
        : null);

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div className="space-y-2">
        <label
          htmlFor="post-title"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          Title
        </label>
        <input
          id="post-title"
          name="title"
          type="text"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Post title"
          className={`${fieldClassName} h-10`}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="post-body"
          className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
        >
          Body
        </label>
        <textarea
          id="post-body"
          name="body"
          required
          rows={6}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write your post..."
          className={`${fieldClassName} min-h-36 resize-y`}
        />
      </div>

      {user ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Publishing as{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {user.name}
          </span>
        </p>
      ) : null}

      {errorMessage ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "Creating..." : "Create post"}
        </Button>
        <Link
          href="/posts"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
