import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";

export interface CreateReviewInput {
  bookingId: string;
  rating: number;
  comment: string;
}

export const createReview = async (
  data: CreateReviewInput,
): Promise<ApiResponse<any>> => {
  return apiClient.post("/reviews", data);
};
