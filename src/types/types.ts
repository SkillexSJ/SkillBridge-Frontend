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
  // Add other meta fields if needed (page, limit, etc.)
}

export interface Response<T> {
  success: boolean;
  data: T;
  meta?: Meta;
  message?: string;
}
