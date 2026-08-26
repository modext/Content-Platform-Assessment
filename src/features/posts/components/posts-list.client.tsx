"use client";

import { useSearchParams } from "next/navigation";

import { getPostsEmptyMessage } from "@/features/posts/lib/get-posts-empty-message";
import { paginatePosts } from "@/features/posts/lib/paginate-posts";
import { parsePostsPage } from "@/features/posts/lib/parse-posts-page";
import { parsePostsSearchParams } from "@/features/posts/lib/parse-posts-search-params";
import { usePosts } from "@/features/posts/hooks";

import { PostsPagination } from "./posts-pagination";
import { PostsListView } from "./posts-list-view";
import { PostsListError, PostsListPending } from "./posts-list-status";

export function PostsList() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const filters = parsePostsSearchParams(params);
  const page = parsePostsPage(params);
  const { data, isPending, isError, refetch } = usePosts(filters);

  if (isPending) {
    return <PostsListPending />;
  }

  if (isError) {
    return (
      <PostsListError
        message="Unable to load posts. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const pagination = paginatePosts(data, page);

  return (
    <div className="space-y-4">
      <PostsListView
        posts={pagination.items}
        emptyMessage={getPostsEmptyMessage(filters)}
      />
      <PostsPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
