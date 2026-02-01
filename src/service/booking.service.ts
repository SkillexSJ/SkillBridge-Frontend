import { apiClient, FetchOptions } from "@/lib/api-client";
import { ApiResponse } from "@/types/types";
import {
  Booking,
  CreateBookingData,
  GetBookingsParams,
} from "@/types/booking.types";

export const getAllBookings = async (
  params?: GetBookingsParams,
  options?: FetchOptions,
): Promise<ApiResponse<Booking[]>> => {
  const query = new URLSearchParams();
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.status) query.append("status", params.status);

  return apiClient.get<ApiResponse<Booking[]>>(
    `/bookings?${query.toString()}`,
    options,
  );
};

export const getBookingById = async (
  id: string,
): Promise<ApiResponse<Booking>> => {
  return apiClient.get<ApiResponse<Booking>>(`/bookings/${id}`);
};

// Admin/Tutor can update status
export const updateBookingStatus = async (
  id: string,
  status: string,
): Promise<ApiResponse<Booking>> => {
  return apiClient.patch<ApiResponse<Booking>>(`/bookings/${id}`, { status });
};

export const createBooking = async (
  data: CreateBookingData,
): Promise<ApiResponse<Booking>> => {
  return apiClient.post<ApiResponse<Booking>>("/bookings", data);
};
