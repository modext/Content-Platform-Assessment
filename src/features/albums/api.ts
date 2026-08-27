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
  const map = await getUserAvatarUrlMap([userId]);

  return map[userId] ?? null;
}

/** Resolve avatar URLs for many users with two bulk album lookups per user batch. */
export async function getUserAvatarUrlMap(
  userIds: number[],
): Promise<Record<number, string>> {
  if (userIds.length === 0) {
    return {};
  }

  const uniqueUserIds = [...new Set(userIds)];
  const userIdSet = new Set(uniqueUserIds);
  const firstAlbumByUser = new Map<number, Album>();

  const albumResults = await Promise.all(
    uniqueUserIds.map((userId) => getAlbumsByUserId(userId)),
  );

  for (const albums of albumResults) {
    const firstAlbum = albums[0];

    if (firstAlbum && userIdSet.has(firstAlbum.userId)) {
      firstAlbumByUser.set(firstAlbum.userId, firstAlbum);
    }
  }

  const avatarEntries = await Promise.all(
    [...firstAlbumByUser.entries()].map(async ([userId, album]) => {
      const photos = await getPhotosByAlbumId(album.id);
      const firstPhoto = photos[0];

      if (!firstPhoto) {
        return null;
      }

      return [userId, resolvePhotoAvatarUrl(firstPhoto, userId)] as const;
    }),
  );

  return Object.fromEntries(
    avatarEntries.filter(
      (entry): entry is readonly [number, string] => entry !== null,
    ),
  );
}
