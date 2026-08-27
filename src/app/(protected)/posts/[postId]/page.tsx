import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetailView } from "@/features/posts/components/post-detail-view";
import { parsePostId } from "@/features/posts/lib/parse-post-id";
import { getCachedPost } from "@/features/posts/server/get-cached-post";
import { getPostDetail } from "@/features/posts/server/get-post-detail";
import { ApiError } from "@/lib/api-error";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { postId } = await params;
  const id = parsePostId(postId);

  if (id === null) {
    return { title: "Post not found | Content Plat4m" };
  }

  try {
    const post = await getCachedPost(id);

    return {
      title: `${post.title} | Content Plat4m`,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Post not found | Content Plat4m" };
    }

    return { title: "Post | Content Plat4m" };
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
