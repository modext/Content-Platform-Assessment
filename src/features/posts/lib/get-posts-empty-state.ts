import type { EmptyStateProps } from "@/components/ui/empty-state";

import type { GetPostsParams } from "@/features/posts/types";

const clearFiltersAction = {
  label: "Clear filters",
  href: "/posts",
} as const;

export function getPostsEmptyState(
  filters: GetPostsParams,
): Pick<EmptyStateProps, "title" | "description" | "action"> {
  const { query, userId } = filters;

  if (query && userId !== undefined) {
    return {
      title: "No matching posts",
      description: `Nothing matched "${query}" for the selected author. Try another search or author.`,
      action: clearFiltersAction,
    };
  }

  if (query) {
    return {
      title: "No matching posts",
      description: `Nothing matched "${query}". Try a different search term or clear the filter.`,
      action: clearFiltersAction,
    };
  }

  if (userId !== undefined) {
    return {
      title: "No posts for this author",
      description:
        "The selected author has not published any posts in this feed yet.",
      action: clearFiltersAction,
    };
  }

  return {
    title: "No posts yet",
    description:
      "There is nothing to show in the feed right now. Create a post to get started.",
    action: {
      label: "Create a post",
      href: "/posts/new",
    },
  };
}
