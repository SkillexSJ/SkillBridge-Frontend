/**
 * Custom Hook for Fetching Cached Popular Tutors
 */

import { useState, useEffect } from "react";
import { TutorResponse } from "@/types/tutor.types";
import { Category } from "@/types/category.types";

interface PopularTutorsData {
  tutors: TutorResponse[];
  categories: Category[];
}

interface UsePopularTutorsReturn {
  tutors: TutorResponse[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function usePopularTutors(): UsePopularTutorsReturn {
  const [data, setData] = useState<PopularTutorsData>({
    tutors: [],
    categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/cache/popular-tutors", {
          next: { revalidate: 300 },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();

        if (result.success) {
          setData({
            tutors: result.tutors,
            categories: result.categories,
          });
        } else {
          throw new Error(result.error || "Unknown error");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        console.error("Error fetching popular tutors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    tutors: data.tutors,
    categories: data.categories,
    loading,
    error,
  };
}
