import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetailView } from "@/features/posts/components/post-detail-view";
import { getPost } from "@/features/posts/api";
import { getPostDetail } from "@/features/posts/server/get-post-detail";
import type { Post } from "@/features/posts/types";
import { ApiError } from "@/lib/api-error";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

function parsePostId(postId: string): Post["id"] | null {
  if (!/^\d+$/.test(postId)) {
    return null;
  }

  const id = Number(postId);

  return id >= 1 ? id : null;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const id = parsePostId(postId);

  if (id === null) {
    return { title: "Post not found | Content Platform" };
  }

  try {
    const post = await getPost(id);

    return {
      title: `${post.title} | Content Platform`,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Post not found | Content Platform" };
    }

    return { title: "Post | Content Platform" };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const id = parsePostId(postId);

  if (id === null) {
    notFound();
  }

  const { post, author, comments } = await getPostDetail(id);

  return <PostDetailView post={post} author={author} comments={comments} />;
}
