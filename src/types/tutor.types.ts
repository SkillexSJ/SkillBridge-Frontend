// Main tutor response
export interface TutorResponse {
  id: string;
  bio: string;
  specialty: string;
  experience: number;
  hourlyRate: string;
  location: string | null;
  totalMentoringMins: number;
  totalSessions: number;
  user: {
    name: string;
    image: string | null;
  };
  categoryId: string;
  category: {
    name: string;
  };
  expertise: string[];
  socialLinks: string[];
  averageRating: number;
  reviewCount: number;
  availabilitySlots?: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];

  // UI-specific
  name?: string;
  role?: string;
  imageUrl?: string;
  rating?: number;
  about?: string;
  responseTime?: string;
  topPercentile?: number;
  industries?: string[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    name: string;
    image: string | null;
  };
}

export interface AvailabilitySlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

// Full tutor details response
export interface TutorDetailResponse {
  id: string;
  userId: string;
  categoryId: string;
  bio: string;
  specialty: string;
  experience: number;
  hourlyRate: string;
  location: string | null;
  expertise: string[];
  socialLinks: any[];
  totalMentoringMins: number;
  totalSessions: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    image: string | null;
    email?: string;
  };
  category: {
    id: string;
    name: string;
    imageUrl: string | null;
    topics: string[];
    createdAt: string;
  };
  reviews: Review[];
  availabilitySlots?: AvailabilitySlot[];
  averageRating: number;
  reviewCount: number;
}

// Meta information for pagination
export interface TutorMeta {
  total: number;
  page: number;
  limit: number;
}

// Query parameters for tutors
export interface GetAllTutorsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  specialty?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  availability?: string;
}
