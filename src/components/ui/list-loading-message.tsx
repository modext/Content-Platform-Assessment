interface ListLoadingMessageProps {
  noun: string;
}

export function ListLoadingMessage({ noun }: ListLoadingMessageProps) {
  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      Loading {noun}...
    </p>
  );
}
