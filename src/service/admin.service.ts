/**
 * LIBS
 */
import { apiClient } from "@/lib/api-client";
/**
 * TYPES
 */
import { ApiResponse } from "@/types/types";
import { User } from "@/types/user.types";
import { DashboardStats, GetUsersParams } from "@/types/admin.types";

export const getAllUsers = async (
  params?: GetUsersParams,
): Promise<ApiResponse<User[]>> => {
  const query = new URLSearchParams();
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  // if (params?.search) query.append("searchTerm", params.search);

  return apiClient.get<ApiResponse<User[]>>(`/admin/users?${query.toString()}`);
};

export const blockUser = async (id: string): Promise<ApiResponse<User>> => {
  return apiClient.patch<ApiResponse<User>>(`/admin/users/${id}`, {});
};

export const getDashboardStats = async (
  options?: any,
): Promise<ApiResponse<DashboardStats>> => {
  return apiClient.get<ApiResponse<DashboardStats>>("/admin/stats", options);
};
