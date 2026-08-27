"use client";

import { useState } from "react";

import {
  getAvatarPaletteClass,
  getUserInitials,
} from "../lib/get-user-initials";
import type { AuthUser } from "../types";

const sizeClassNames = {
  sm: "h-9 w-9 text-xs",
  md: "h-10 w-10 text-sm",
} as const;

interface UserAvatarProps {
  user: Pick<AuthUser, "id" | "name">;
  avatarUrl?: string | null;
  size?: keyof typeof sizeClassNames;
  ringClassName?: string;
}

export function UserAvatar({
  user,
  avatarUrl,
  size = "sm",
  ringClassName = "ring-2 ring-white dark:ring-zinc-950",
}: UserAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getUserInitials(user.name);
  const paletteClass = getAvatarPaletteClass(user.id);
  const showImage = Boolean(avatarUrl) && !imageFailed;

  return (
    <span
      className={[
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizeClassNames[size],
        ringClassName,
        showImage ? "bg-zinc-200 dark:bg-zinc-800" : paletteClass,
      ].join(" ")}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- external avatar CDN
        <img
          src={avatarUrl!}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
        />
      ) : (
        initials
      )}
    </span>
  );
}
