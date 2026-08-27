"use client";

import { useSearchParams } from "next/navigation";

import { ListLoadingMessage } from "@/components/ui/list-loading-message";
import { QueryRetryAlert } from "@/components/ui/query-retry-alert";
import { getPostsEmptyState } from "@/features/posts/lib/get-posts-empty-state";
import { paginatePosts } from "@/features/posts/lib/paginate-posts";
import { parsePostsListParams } from "@/features/posts/lib/parse-posts-list-params";
import { usePosts } from "@/features/posts/hooks";

import { PostsPagination } from "./posts-pagination";
import { PostsListView } from "./posts-list-view";

export function PostsList() {
  const searchParams = useSearchParams();
  const { filters, page } = parsePostsListParams(
    Object.fromEntries(searchParams.entries()),
  );
  const { data, isPending, isError, refetch } = usePosts(filters);

  if (isPending) {
    return <ListLoadingMessage noun="posts" />;
  }

  if (isError) {
    return (
      <QueryRetryAlert
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
        emptyState={getPostsEmptyState(filters)}
      />
      <PostsPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
