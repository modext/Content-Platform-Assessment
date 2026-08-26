import Link from "next/link";

export interface EmptyStateAction {
  label: string;
  href: string;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  action?: EmptyStateAction;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-10 text-center dark:border-zinc-700 dark:bg-zinc-900/40"
      role="status"
    >
      <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      {action ? (
        <Link
          href={action.href}
          className="mt-4 inline-flex text-sm font-medium text-zinc-950 underline underline-offset-4 dark:text-zinc-50"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
