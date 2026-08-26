import "server-only";

import { cache } from "react";

import { getPost } from "../api";
import type { Post } from "../types";

export const getCachedPost = cache(async (postId: Post["id"]) =>
  getPost(postId),
);
