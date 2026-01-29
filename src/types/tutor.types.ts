// Main tutor response type from backend API
export interface TutorResponse {
  id: string;
  bio: string;
  specialty: string;
  experience: string;
  hourlyRate: string;
  location: string | null;
  totalMentoringMins: number;
  totalSessions: number;
  user: {
    name: string;
    image: string | null;
  };
  category: {
    name: string;
  };
  averageRating: number;
  reviewCount: number;

  // UI-specific optional fields (not in backend response)
  name?: string; // Derived from user.name
  role?: string; // Derived from category.name
  imageUrl?: string; // Derived from user.image
  rating?: number; // Same as averageRating
  about?: string; // Same as bio
  responseTime?: string; // UI default
  topPercentile?: number; // UI default
  expertise?: string[]; // Not in listing, only in details
  industries?: string[]; // UI default
  socialLinks?: Record<string, string>; // Not in listing, only in details
}

// Full tutor details response from backend (for individual tutor page)
export interface TutorDetailResponse {
  id: string;
  userId: string;
  categoryId: string;
  bio: string;
  specialty: string;
  experience: string;
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
  reviews: any[];
  availabilitySlots?: any[];
}

// Meta information for paginated tutor responses
export interface TutorMeta {
  total: number;
  page: number;
  limit: number;
}

// Query parameters for fetching tutors
export interface GetAllTutorsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  specialty?: string;
  search?: string;
}
