import type { Metadata } from "next";

import { DashboardMetricsGrid } from "@/features/dashboard/components/dashboard-metrics";
import { DashboardRecentPosts } from "@/features/dashboard/components/dashboard-recent-posts";
import { getDashboardData } from "@/features/dashboard/server/get-dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard | Content Plat4m",
};

export default async function DashboardPage() {
  const { metrics, recentPosts } = await getDashboardData();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Summary metrics and recent activity across the platform.
        </p>
      </div>

      <DashboardMetricsGrid metrics={metrics} />
      <DashboardRecentPosts posts={recentPosts} />
    </section>
  );
}
