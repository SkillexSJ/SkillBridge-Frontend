"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types/category.types";

export function useCachedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/cache/categories", {
          next: { revalidate: 3600 },
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (e) {
        console.error("Failed to fetch categories", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  return { categories, loading };
}
