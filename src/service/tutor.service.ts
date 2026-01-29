import { Response } from "@/types/types";
import {
  TutorResponse,
  TutorMeta,
  GetAllTutorsParams,
} from "@/types/tutor.types";

// Fallback to localhost:5000 if env var is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getAllTutors = async (
  params?: GetAllTutorsParams,
): Promise<Response<TutorResponse[]> & { meta: TutorMeta }> => {
  try {
    // Build query string
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }
    if (params?.categoryId) {
      queryParams.append("categoryId", params.categoryId);
    }
    if (params?.specialty) {
      queryParams.append("specialty", params.specialty);
    }
    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const url = `${API_URL}/tutors${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tutors");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    throw error;
  }
};

export const getTutorById = async (
  id: string,
): Promise<Response<TutorResponse>> => {
  try {
    const res = await fetch(`${API_URL}/tutors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tutor");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching tutor:", error);
    throw error;
  }
};
