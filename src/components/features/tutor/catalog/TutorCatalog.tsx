"use client";

import React, { useState, useMemo, useEffect, useReducer } from "react";
import { TutorFilter } from "./TutorFilter";
import { TutorGrid } from "./TutorGrid";
import { TutorPagination } from "./TutorPagination";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { getAllTutors } from "@/service/tutor.service";
import { getAllCategories } from "@/service/category.service";
import { TutorResponse } from "@/types/tutor.types";
import { Category } from "@/types/types";
import { filterTutors, sortTutors, paginateItems } from "./tutorCatalogUtils";
import { demoTutors } from "@/data/dummy-data";

interface TutorCatalogProps {
  initialCategory?: string;
}

// Filter state management
interface FilterState {
  activeCategory: string;
  searchQuery: string;
  sortBy: "recommended" | "price_low" | "price_high" | "rating";
  filterAvailability: string;
  currentPage: number;
}

type FilterAction =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: FilterState["sortBy"] }
  | { type: "SET_AVAILABILITY"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "RESET_FILTERS" };

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, activeCategory: action.payload, currentPage: 1 };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case "SET_SORT":
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case "SET_AVAILABILITY":
      return { ...state, filterAvailability: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "RESET_FILTERS":
      return {
        activeCategory: "All Tutors",
        searchQuery: "",
        sortBy: "recommended",
        filterAvailability: "any",
        currentPage: 1,
      };
    default:
      return state;
  }
}

const TutorCatalog: React.FC<TutorCatalogProps> = ({ initialCategory }) => {
  const [filters, dispatch] = useReducer(filterReducer, {
    activeCategory: initialCategory || "All Tutors",
    searchQuery: "",
    sortBy: "recommended",
    filterAvailability: "any",
    currentPage: 1,
  });

  const [tutors, setTutors] = useState<TutorResponse[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

  // Fetch categories and tutors in parallel
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, tutorsResponse] = await Promise.all([
          getAllCategories(),
          getAllTutors({
            page: 1,
            limit: 1000, // Fetch all tutors for client-side filtering
          }),
        ]);

        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        if (tutorsResponse.success && tutorsResponse.data) {
          setTutors(tutorsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      dispatch({ type: "SET_CATEGORY", payload: initialCategory });
    }
  }, [initialCategory]);

  // Apply filters and sorting
  const filteredAndSortedTutors = useMemo(() => {
    let result = filterTutors(tutors, {
      category: filters.activeCategory,
      searchQuery: filters.searchQuery,
      availability: filters.filterAvailability,
    });

    result = sortTutors(result, filters.sortBy);

    return result;
  }, [tutors, filters]);

  // Paginate the filtered results
  const paginatedTutors = useMemo(() => {
    return paginateItems(
      filteredAndSortedTutors,
      filters.currentPage,
      itemsPerPage,
    );
  }, [filteredAndSortedTutors, filters.currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTutors.length / itemsPerPage);

  // Dynamic category names from backend + "All Tutors"
  const categoryNames = useMemo(() => {
    return ["All Tutors", ...categories.map((cat) => cat.name)];
  }, [categories]);

  const handleFilterChange = (
    type: string,
    value: string | "recommended" | "price_low" | "price_high" | "rating",
  ) => {
    switch (type) {
      case "category":
        dispatch({ type: "SET_CATEGORY", payload: value as string });
        break;
      case "search":
        dispatch({ type: "SET_SEARCH", payload: value as string });
        break;
      case "sort":
        dispatch({
          type: "SET_SORT",
          payload: value as
            | "recommended"
            | "price_low"
            | "price_high"
            | "rating",
        });
        break;
      case "availability":
        dispatch({ type: "SET_AVAILABILITY", payload: value as string });
        break;
    }
  };

  const handleClearFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">
            Browse Tutors
          </h1>

          <div className="mb-8">
            <Tabs
              value={filters.activeCategory}
              onValueChange={(value) => handleFilterChange("category", value)}
              className="w-full"
            >
              <TabsList
                variant="underline"
                className="bg-transparent p-0 gap-6 w-full justify-start overflow-x-auto scrollbar-hide border-b border-border pb-px"
              >
                {categoryNames.map((cat) => (
                  <TabsTab
                    key={cat}
                    value={cat}
                    className="text-muted-foreground data-active:text-primary text-base px-0 bg-transparent hover:text-foreground transition-colors h-12"
                  >
                    {cat}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <TutorFilter
            searchQuery={filters.searchQuery}
            onSearchChange={(value) => handleFilterChange("search", value)}
            sortBy={filters.sortBy}
            onSortChange={(value) => handleFilterChange("sort", value)}
            filterAvailability={filters.filterAvailability}
            onAvailabilityChange={(value) =>
              handleFilterChange("availability", value)
            }
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-100">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-muted-foreground">Loading tutors...</p>
            </div>
          </div>
        ) : (
          <TutorGrid
            tutors={paginatedTutors}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Pagination */}
        <TutorPagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredAndSortedTutors.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default TutorCatalog;

//TODO:ONEK KAJ BAKI
