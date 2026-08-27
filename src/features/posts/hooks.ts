"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getListParamsFromQueryKey } from "@/lib/query-keys";

import { createPost } from "./api";
import {
  createOptimisticPost,
  isOptimisticPostId,
} from "./lib/create-optimistic-post";
import { postMatchesListFilters } from "./lib/post-list-filters";
import { postKeys, postQueries } from "./queries";
import type { CreatePostInput, GetPostsParams, Post } from "./types";

export function usePosts(params: GetPostsParams = {}) {
  return useQuery(postQueries.list(params));
}

function prependPostToList(
  posts: Post[],
  post: Post,
  filters: GetPostsParams,
): Post[] {
  if (!postMatchesListFilters(post, filters)) {
    return posts;
  }

  return [post, ...posts.filter((item) => item.id !== post.id)];
}

function updateAllPostLists(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (posts: Post[], filters: GetPostsParams) => Post[] | undefined,
) {
  for (const query of queryClient.getQueryCache().findAll({
    queryKey: postKeys.lists(),
  })) {
    queryClient.setQueryData<Post[]>(query.queryKey, (oldData) => {
      if (!oldData) {
        return oldData;
      }

      return updater(
        oldData,
        getListParamsFromQueryKey<GetPostsParams>(query.queryKey),
      );
    });
  }
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: postKeys.lists() });

      const previousLists = queryClient.getQueriesData<Post[]>({
        queryKey: postKeys.lists(),
      });

      const optimisticPost = createOptimisticPost(input);

      updateAllPostLists(queryClient, (oldData, filters) =>
        prependPostToList(oldData, optimisticPost, filters),
      );

      return { previousLists };
    },
    onError: (_error, _input, context) => {
      if (!context?.previousLists) {
        return;
      }

      for (const [queryKey, data] of context.previousLists) {
        queryClient.setQueryData(queryKey, data);
      }
    },
    onSuccess: (createdPost) => {
      updateAllPostLists(queryClient, (oldData, filters) => {
        const withoutOptimistic = oldData.filter(
          (post) => !isOptimisticPostId(post.id),
        );

        return prependPostToList(withoutOptimistic, createdPost, filters);
      });
    },
  });
}
