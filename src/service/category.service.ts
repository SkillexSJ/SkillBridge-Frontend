import { Category, Response } from "@/types/types";

// Fallback to localhost:5000 if env var is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getAllCategories = async (): Promise<Response<Category[]>> => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (
  data: Partial<Category>,
): Promise<Category> => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create category");
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
