import { Booking } from "./booking.types";

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface DashboardStats {
  users: {
    students: number;
    tutors: number;
    activeTutors: number;
  };
  bookings: {
    total: number;
    recent: Booking[];
    byStatus: { status: string; count: number }[];
  };
  revenue: {
    total: number;
  };
}
