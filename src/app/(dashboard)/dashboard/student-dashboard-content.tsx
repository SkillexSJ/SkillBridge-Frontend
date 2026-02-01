"use client";

/**
 * NODE PACKAGES
 */
import {
  IconCalendarEvent,
  IconCheck,
  IconCreditCard,
} from "@tabler/icons-react";
import { StatCard } from "@/components/features/dashboard/shared/stat-card";
import { SessionsTable } from "@/components/features/dashboard/shared/sessions-table";

/**
 * TYPES
 */
import { StudentStats } from "@/types/user.types";
import { Booking } from "@/types/booking.types";

/**
 * INTERFACE
 */
interface StudentDashboardContentProps {
  stats: StudentStats;
  recentBookings: Booking[];
}

export function StudentDashboardContent({
  stats,
  recentBookings,
}: StudentDashboardContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={IconCalendarEvent}
          description="Upcoming & Pending"
        />
        <StatCard
          title="Completed Sessions"
          value={stats.completedBookings}
          icon={IconCheck}
          description="Total sessions finished"
        />
        <StatCard
          title="Total Spent"
          value={`$${Number(stats.totalSpent).toFixed(2)}`}
          icon={IconCreditCard}
          description="Lifetime investment"
        />
      </div>

      <div className="space-y-4">
        <SessionsTable bookings={recentBookings} role="student" />
      </div>
    </div>
  );
}
