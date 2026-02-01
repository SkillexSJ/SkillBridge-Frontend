/**
 * TYPES
 */
import { ApiResponse } from "@/types/types";
import { StudentStats, User } from "@/types/user.types";

/**
 * API CLIENT
 */
import { apiClient } from "@/lib/api-client";

// image uploader
export const uploadProfileImage = async (
  file: File,
): Promise<ApiResponse<any>> => {
  const formData = new FormData();
  formData.append("image", file);

  return apiClient.post<ApiResponse<any>>("/users/profile/image", formData);
};

export const getProfile = async (): Promise<ApiResponse<User>> => {
  return apiClient.get<ApiResponse<User>>("/users/profile");
};

export const getStudentDashboardStats = async (
  options?: any,
): Promise<ApiResponse<StudentStats>> => {
  return apiClient.get<ApiResponse<StudentStats>>("/users/stats", options);
};
