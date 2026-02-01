"use client";

import {
  IconCurrencyDollar,
  IconStar,
  IconClock,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { StatCard } from "@/components/features/dashboard/shared/stat-card";
import { SessionsTable } from "@/components/features/dashboard/shared/sessions-table";
import { PendingBookingsList } from "@/components/features/dashboard/tutor/bookings/PendingBookingsList";
import { Booking } from "@/types/booking.types";

/**
 * INTERFACES
 */
interface TutorStats {
  totalMentoringMins: number;
  totalSessions: number;
  totalEarnings: number;
  averageRating: number;
  totalReviews: number;
}

interface TutorDashboardContentProps {
  stats: TutorStats;
  pendingBookings: Booking[];
  sessionBookings: Booking[];
}

export function TutorDashboardContent({
  stats,
  pendingBookings,
  sessionBookings,
}: TutorDashboardContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tutor Dashboard</h2>
      </div>

      {/* Top Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* stats cards */}
        <StatCard
          title="Total Earnings"
          value={`$${Number(stats.totalEarnings).toFixed(2)}`}
          icon={IconCurrencyDollar}
          description="Total lifetime earnings"
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          title="Total Sessions"
          value={stats.totalSessions}
          icon={IconCalendarEvent}
          description="Completed sessions"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={IconStar}
          description={`From ${stats.totalReviews} reviews`}
        />
        <StatCard
          title="Mentoring Hours"
          value={Math.round(stats.totalMentoringMins / 60)}
          icon={IconClock}
          description={`${stats.totalMentoringMins} total minutes`}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <SessionsTable bookings={sessionBookings} role="tutor" />
        </div>

        {/* Right Widget */}
        <div className="lg:col-span-1">
          <PendingBookingsList initialBookings={pendingBookings} />
        </div>
      </div>
    </div>
  );
}
