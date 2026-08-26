import { EmptyState } from "@/components/ui/empty-state";
import type { Comment } from "@/features/comments/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PostCommentsListProps {
  comments: Comment[];
}

export function PostCommentsList({ comments }: PostCommentsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
        <CardDescription>
          {comments.length === 1 ? "1 comment" : `${comments.length} comments`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {comments.length === 0 ? (
          <EmptyState
            title="No comments yet"
            description="This post does not have any discussion threads to display."
          />
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="space-y-2 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
                    {comment.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {comment.email}
                  </p>
                </div>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
