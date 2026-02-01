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
