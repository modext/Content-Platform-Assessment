import { apiClient } from "@/lib/axios";

import type { Album, Photo } from "./types";

export async function getAlbumsByUserId(userId: number): Promise<Album[]> {
  const response = await apiClient.get<Album[]>("/albums", {
    params: { userId },
  });

  return response.data;
}

export async function getPhotosByAlbumId(albumId: number): Promise<Photo[]> {
  const response = await apiClient.get<Photo[]>("/photos", {
    params: { albumId },
  });

  return response.data;
}

/**
 * JSONPlaceholder photo URLs use via.placeholder.com, which no longer serves images.
 * We still resolve avatars from album/photo records, but map them to a stable CDN URL.
 */
export function resolvePhotoAvatarUrl(photo: Photo, userId: number): string {
  return `https://picsum.photos/seed/content-platform-u${userId}-p${photo.id}/150/150`;
}

/** First photo from the user's earliest album — used for profile avatars. */
export async function getUserAvatarUrl(userId: number): Promise<string | null> {
  const albums = await getAlbumsByUserId(userId);
  const firstAlbum = albums[0];

  if (!firstAlbum) {
    return null;
  }

  const photos = await getPhotosByAlbumId(firstAlbum.id);
  const firstPhoto = photos[0];

  if (!firstPhoto) {
    return null;
  }

  return resolvePhotoAvatarUrl(firstPhoto, userId);
}
