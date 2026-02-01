/**
 * NODE PACKAGES
 */
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
/**
 * SERVICES
 */
import { getTutorStats } from "@/service/tutor.service";
import { getAllBookings } from "@/service/booking.service";

/**
 * COMPONENTS
 */
import { TutorDashboardContent } from "./tutor-dashboard-content";
import { DashboardSkeleton } from "@/components/features/dashboard/shared/dashboard-skeleton";

/**
 * LIBS
 */
import { requireUser } from "@/lib/session";

export default async function TutorDashboardPage() {
  const user = await requireUser();

  if (user.role !== "tutor") {
    const cookieStore = await cookies();
    const intendedRole = cookieStore.get("intended_role")?.value;

    // for tutor onboarding
    if (intendedRole === "tutor") {
      redirect("/onboarding/tutor");
    }

    // route protection for tutor
    if (user.role === "admin") redirect("/admin");
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <TutorDashboardDataWrapper />
    </Suspense>
  );
}

async function TutorDashboardDataWrapper() {
  const headersList = await headers();
  const fetchOptions = {
    headers: {
      Cookie: headersList.get("cookie") || "",
    },
  };

  try {
    const [statsRes, bookingsRes] = await Promise.all([
      getTutorStats(fetchOptions),
      getAllBookings({ limit: 100 }, fetchOptions),
    ]);

    if (!statsRes.success) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Failed to load statistics
          </h2>
          <p className="text-muted-foreground">{statsRes.message}</p>
        </div>
      );
    }

    const allBookings = bookingsRes.success ? bookingsRes.data : [];
    const pendingBookings = allBookings.filter((b) => b.status === "pending");
    const sessionBookings = allBookings.filter((b) => b.status !== "pending");

    return (
      <TutorDashboardContent
        stats={statsRes.data}
        pendingBookings={pendingBookings}
        sessionBookings={sessionBookings}
      />
    );
  } catch (error) {
    console.error("Error fetching tutor dashboard data:", error);
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
