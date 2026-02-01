export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  studentId: string;
  student?: {
    name: string;
    email: string;
    image?: string;
  };
  tutorProfileId: string;
  tutorProfile?: {
    user: {
      name: string;
      email: string;
      image?: string;
    };
    category?: {
      name: string;
    };
  };
  sessionDate: string; // ISO Date string
  startTime: string;
  endTime: string;
  status: BookingStatus;
  totalPrice: number;
  createdAt: string;
}

export interface GetBookingsParams {
  page?: number;
  limit?: number;
  status?: string;
}

export interface CreateBookingData {
  tutorProfileId: string;
  sessionDate: string | Date;
  startTime: string;
  endTime: string;
  totalPrice: number;
}
