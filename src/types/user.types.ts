import { ApiError } from "next/dist/server/api-utils";

export type UserRole = "student" | "tutor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  isBlocked: boolean;
  image?: string;
  createdAt: Date;
}

export interface StudentStats {
  completedBookings: number;
  activeBookings: number;
  totalSpent: number;
  joinedAt: string;
}
