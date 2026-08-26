"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost } from "./api";
import { postKeys, postQueries } from "./queries";
import type { CreatePostInput, GetPostsParams } from "./types";

export function usePosts(params: GetPostsParams = {}) {
  return useQuery(postQueries.list(params));
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
}
