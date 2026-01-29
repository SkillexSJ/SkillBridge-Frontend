/**
 * LIB
 */
import { apiClient, FetchOptions } from "@/lib/api-client";

/**
 * TYPES
 */
import { ApiResponse, Category } from "@/types/types";

export const getAllCategories = async (
  params?: {
    limit?: number;
    page?: number;
  },
  options?: FetchOptions,
): Promise<ApiResponse<Category[]>> => {
  const queryParams = new URLSearchParams();
  // Limit
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  // Page
  if (params?.page) queryParams.append("page", params.page.toString());

  const queryString = queryParams.toString();
  const endpoint = `/categories${queryString ? `?${queryString}` : ""}`;
  return apiClient.get<ApiResponse<Category[]>>(endpoint, options);
};

export const createCategory = async (
  data: Partial<Category>,
): Promise<Category> => {
  const result = await apiClient.post<{ data: Category }>("/categories", data);
  return result.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  return apiClient.delete(`/categories/${id}`);
};
