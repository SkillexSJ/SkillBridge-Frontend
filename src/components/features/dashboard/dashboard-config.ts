import {
  IconDashboard,
  IconUsers,
  IconCalendarEvent,
  IconChartBar,
  IconUserCircle,
  IconSearch,
  IconCategory,
  IconClock,
} from "@tabler/icons-react";

export type UserRole = "student" | "tutor" | "admin";

export const dashboardConfig = {
  student: {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Browse Tutors",
        url: "/tutors",
        icon: IconSearch,
      },
      {
        title: "My Bookings",
        url: "/student/bookings",
        icon: IconCalendarEvent,
      },
      {
        title: "My Profile",
        url: "/dashboard/profile",
        icon: IconUserCircle,
      },
    ],
  },
  tutor: {
    navMain: [
      {
        title: "Dashboard",
        url: "/tutor",
        icon: IconDashboard,
      },
      {
        title: "My Schedule",
        url: "/tutor/schedule",
        icon: IconCalendarEvent,
      },
      {
        title: "My Students",
        url: "/tutor/students",
        icon: IconUsers,
      },
      {
        title: "Availability",
        url: "/tutor/availability",
        icon: IconClock,
      },
    ],
  },
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: IconDashboard,
      },
      {
        title: "Users Management",
        url: "/admin/users",
        icon: IconUsers,
      },
      {
        title: "Bookings",
        url: "/admin/bookings",
        icon: IconCalendarEvent,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: IconCategory,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: IconChartBar,
      },
    ],
  },
};
