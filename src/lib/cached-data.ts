import { unstable_cache } from "next/cache";
import { getAllTutors } from "@/service/tutor.service";
import { getAllCategories } from "@/service/category.service";

/**
 * Cache popular tutors
 *
 */
export const getCachedPopularTutors = unstable_cache(
  async () => {
    const response = await getAllTutors({
      limit: 50,
      sortBy: "rating",
    });

    if (!response.success) {
      throw new Error("Failed to fetch tutors");
    }

    return response;
  },
  ["popular-tutors"],
  {
    revalidate: 60,
    tags: ["tutors", "popular"],
  },
);

/**
 * Cache ALL categories
 */
export const getCachedCategories = unstable_cache(
  async () => {
    const response = await getAllCategories();

    if (!response.success) {
      throw new Error("Failed to fetch categories");
    }

    return response;
  },
  ["all-categories"],
  {
    revalidate: 60, // 1 minute
    tags: ["categories"],
  },
);
