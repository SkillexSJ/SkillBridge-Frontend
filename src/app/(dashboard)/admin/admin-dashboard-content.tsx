"use client";

/**
 * NODE PACKAGES
 */
import {
  IconUsers,
  IconCalendarEvent,
  IconChartBar,
  IconCurrencyDollar,
} from "@tabler/icons-react";
/**
 * COMPONENTS
 */
import { UserDistributionChart } from "@/components/features/dashboard/analytics/UserDistributionChart";
import { BookingStatusChart } from "@/components/features/dashboard/analytics/BookingStatusChart";
import { RecentBookings } from "@/components/features/dashboard/analytics/RecentBookings";
import { StatCard } from "@/components/features/dashboard/shared/stat-card";

/**
 * TYPES
 */
import { DashboardStats } from "@/types/admin.types";

interface AdminDashboardContentProps {
  stats: DashboardStats;
}

export function AdminDashboardContent({ stats }: AdminDashboardContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={(stats.users.students || 0) + (stats.users.tutors || 0)}
          icon={IconUsers}
          description="Total registered users"
        />
        <StatCard
          title="Total Bookings"
          value={stats.bookings.total || 0}
          icon={IconCalendarEvent}
          trend="+12%"
          trendUp={true}
          description="from last month"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.total || 0}`}
          icon={IconCurrencyDollar}
          trend="+8%"
          trendUp={true}
          description="from last month"
        />
        <StatCard
          title="Active Tutors"
          value={stats.users.activeTutors || 0}
          icon={IconChartBar}
          description="Tutors with bookings"
        />

        <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <BookingStatusChart data={stats.bookings.byStatus || []} />
          <UserDistributionChart
            students={stats.users.students || 0}
            tutors={stats.users.tutors || 0}
          />
        </div>

        <RecentBookings bookings={stats.bookings.recent || []} />
      </div>
    </div>
  );
}
