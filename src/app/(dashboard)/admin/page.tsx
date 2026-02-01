/**
 * NODE PACKAGES
 */
import { headers } from "next/headers";
import { Suspense } from "react";
import { redirect } from "next/navigation";

/**
 * SERVICES
 */
import { getDashboardStats } from "@/service/admin.service";

/**
 * COMPONENTS
 */
import { AdminDashboardContent } from "./admin-dashboard-content";
import { DashboardSkeleton } from "@/components/features/dashboard/shared/dashboard-skeleton";

/**
 * LIBS
 */
import { requireUser } from "@/lib/session";

export default async function AdminDashboardPage() {
  const user = await requireUser();

  if (user.role !== "admin") {
    if (user.role === "tutor") redirect("/tutor");
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboardDataWrapper />
    </Suspense>
  );
}

async function AdminDashboardDataWrapper() {
  const headersList = await headers();

  try {
    const response = await getDashboardStats({
      headers: {
        Cookie: headersList.get("cookie") || "",
      },
    });

    if (!response.success) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to load statistics
          </h2>
          <p className="text-muted-foreground">{response.message}</p>
        </div>
      );
    }

    return <AdminDashboardContent stats={response.data} />;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h2>
        <p className="text-muted-foreground">
          We couldn't load your dashboard. Please try refreshing the page.
        </p>
      </div>
    );
  }
}
