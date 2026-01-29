import { TutorResponse } from "@/types/tutor.types";

interface FilterOptions {
  category: string;
  searchQuery: string;
  availability: string;
}

/**
 * Filters tutors based on category, search query, and availability
 */
export function filterTutors(
  tutors: TutorResponse[],
  options: FilterOptions,
): TutorResponse[] {
  let result = [...tutors];

  // Category Filter
  if (options.category !== "All Tutors") {
    result = result.filter(
      (tutor) =>
        tutor.specialty === options.category ||
        tutor.category.name.includes(options.category) ||
        (tutor.expertise &&
          tutor.expertise.some((e) => e.includes(options.category))),
    );
  }

  // Search Filter
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    result = result.filter(
      (tutor) =>
        tutor.user.name.toLowerCase().includes(query) ||
        tutor.category.name.toLowerCase().includes(query) ||
        tutor.specialty.toLowerCase().includes(query),
    );
  }

  // Availability Filter
  if (options.availability === "today") {
    result = result.filter(
      (tutor) =>
        tutor.responseTime &&
        (tutor.responseTime.includes("hr") ||
          tutor.responseTime.includes("hour")),
    );
  }

  return result;
}

/**
 * Sorts tutors based on the specified criteria
 */
export function sortTutors(
  tutors: TutorResponse[],
  sortBy: "recommended" | "price_low" | "price_high" | "rating",
): TutorResponse[] {
  const result = [...tutors];

  switch (sortBy) {
    case "price_low":
      return result.sort(
        (a, b) => parseFloat(a.hourlyRate) - parseFloat(b.hourlyRate),
      );
    case "price_high":
      return result.sort(
        (a, b) => parseFloat(b.hourlyRate) - parseFloat(a.hourlyRate),
      );
    case "rating":
      return result.sort((a, b) => b.averageRating - a.averageRating);
    case "recommended":
    default:
      return result;
  }
}

/**
 * Paginates an array of items
 */
export function paginateItems<T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number,
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
}
