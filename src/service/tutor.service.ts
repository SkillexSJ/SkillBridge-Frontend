/**
 * TYPES
 */
import { ApiResponse } from "@/types/types";
import {
  TutorResponse,
  TutorMeta,
  GetAllTutorsParams,
  TutorDetailResponse,
} from "@/types/tutor.types";

/**
 * LIBS
 */
import { apiClient } from "@/lib/api-client";

export const getAllTutors = async (
  params?: GetAllTutorsParams,
): Promise<ApiResponse<TutorResponse[]> & { meta: TutorMeta }> => {
  //  query string
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.categoryId && params.categoryId !== "All Tutors")
    queryParams.append("categoryId", params.categoryId);
  if (params?.specialty) queryParams.append("specialty", params.specialty);

  // Mapping
  if (params?.search) queryParams.append("searchTerm", params.search);
  if (params?.minPrice)
    queryParams.append("minPrice", params.minPrice.toString());
  if (params?.maxPrice)
    queryParams.append("maxPrice", params.maxPrice.toString());
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);

  const queryString = queryParams.toString();
  const endpoint = `/tutors${queryString ? `?${queryString}` : ""}`;

  return apiClient.get(endpoint, { cache: "no-store" });
};

export const getTutorById = async (
  id: string,
): Promise<ApiResponse<TutorDetailResponse>> => {
  return apiClient.get(`/tutors/${id}`, { cache: "no-store" });
};

export interface TutorProfileInput {
  categoryId: string;
  bio: string;
  specialty: string;
  experience: number;
  hourlyRate: number;
  location?: string;
  expertise?: string[];
  socialLinks?: string[];
}

export const createTutorProfile = async (
  data: TutorProfileInput,
): Promise<ApiResponse<TutorResponse>> => {
  return apiClient.post("/tutors", data);
};

export const getMyTutorProfile = async (): Promise<
  ApiResponse<TutorResponse>
> => {
  return apiClient.get("/tutors/me");
};

export const updateTutorProfile = async (
  data: Partial<TutorProfileInput>,
): Promise<ApiResponse<TutorResponse>> => {
  return apiClient.patch("/tutors/me", data);
};

export interface AvailabilitySlotInput {
  dayOfWeek: number;
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export const updateTutorAvailability = async (
  slots: AvailabilitySlotInput[],
): Promise<ApiResponse<any>> => {
  return apiClient.put("/tutors/availability", { slots });
};

export const getTutorStats = async (
  options?: any,
): Promise<ApiResponse<any>> => {
  return apiClient.get("/tutors/stats", options);
};
