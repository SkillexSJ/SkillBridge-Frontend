export interface Meta {
  totalCategories?: number;
  totalTutors?: number;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: Meta;
  message?: string;
  error?: any;
}
