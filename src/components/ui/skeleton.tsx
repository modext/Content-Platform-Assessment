import type { HTMLAttributes } from "react";

export function Skeleton({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
