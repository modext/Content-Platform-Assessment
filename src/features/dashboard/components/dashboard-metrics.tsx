import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { DashboardMetrics } from "@/features/dashboard/server/get-dashboard-data";

interface DashboardMetricsProps {
  metrics: DashboardMetrics;
}

const metricItems = [
  { key: "postsCount", label: "Total posts", description: "Published entries" },
  {
    key: "authorsCount",
    label: "Total authors",
    description: "Registered users",
  },
  {
    key: "commentsCount",
    label: "Total comments",
    description: "Discussion threads",
  },
] as const;

export function DashboardMetricsGrid({ metrics }: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metricItems.map((item) => (
        <Card key={item.key}>
          <CardHeader className="pb-2">
            <CardDescription>{item.description}</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              {metrics[item.key]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              {item.label}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
