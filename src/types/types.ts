export interface Category {
  id: string;
  name: string;
  iconName?: string;
  imageUrl?: string;
  topics?: string[];
  createdAt: Date;
  _count?: {
    tutorProfiles: number;
  };
}

export interface Meta {
  totalCategories?: number;
  totalTutors?: number;
  total?: number;
  page?: number;
  limit?: number;
}

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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: Meta;
  message?: string;
}
