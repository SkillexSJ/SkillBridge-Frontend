"use client";

/**
 * USED "UseReducer" for filter in this component for better filtering
 */

/**
 * NODE PACKAGES
 */
import React, { useState, useMemo, useEffect, useReducer } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

/**
 * COMPONENTS
 */
import { TutorFilter } from "./TutorFilter";
import { PriceFilter } from "./PriceFilter";
import { TutorGrid } from "./TutorGrid";
import { TutorPagination } from "./TutorPagination";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

/**
 * SERVICES
 */
import { getAllTutors } from "@/service/tutor.service";

/**
 * TYPES
 */
import { TutorResponse, TutorMeta } from "@/types/tutor.types";

import { toast } from "sonner";
import { useCachedCategories } from "@/hooks/useCategories";

/**
 * INTERFACES
 */
interface TutorCatalogProps {
  initialCategory?: string;
}

// Filter state
interface FilterState {
  activeCategory: string;
  searchQuery: string;
  sortBy: "experience" | "price_asc" | "price_desc" | "rating";
  filterAvailability: string;
  minPrice: number | "";
  maxPrice: number | "";
  currentPage: number;
}
// Filter action
type FilterAction =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: FilterState["sortBy"] }
  | { type: "SET_AVAILABILITY"; payload: string }
  | { type: "SET_MIN_PRICE"; payload: number | "" }
  | { type: "SET_MAX_PRICE"; payload: number | "" }
  | { type: "SET_PAGE"; payload: number }
  | { type: "RESET_FILTERS" };

// Filter reducer
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
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload, currentPage: 1 };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "RESET_FILTERS":
      return {
        activeCategory: "All Tutors",
        searchQuery: "",
        sortBy: "experience",
        filterAvailability: "any",
        minPrice: "",
        maxPrice: "",
        currentPage: 1,
      };
    default:
      return state;
  }
}

const TutorCatalog: React.FC<TutorCatalogProps> = ({ initialCategory }) => {
  // URL params
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  // Filter state
  const [filters, dispatch] = useReducer(filterReducer, {
    activeCategory: urlCategory || initialCategory || "All Tutors",
    searchQuery: urlSearch || "",
    sortBy: "experience", // Default sort
    filterAvailability: "any",
    minPrice: "",
    maxPrice: "",
    currentPage: 1,
  });

  // Data states
  const [tutors, setTutors] = useState<TutorResponse[]>([]);
  // Use cached categories hook
  const { categories } = useCachedCategories();

  const [meta, setMeta] = useState<TutorMeta>({ page: 1, limit: 12, total: 0 });
  const [loading, setLoading] = useState(true);

  // Handle URL params
  useEffect(() => {
    if (urlCategory && urlCategory !== filters.activeCategory) {
      dispatch({ type: "SET_CATEGORY", payload: urlCategory });
    }
    if (urlSearch && urlSearch !== filters.searchQuery) {
      dispatch({ type: "SET_SEARCH", payload: urlSearch });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategory, urlSearch]);

  // Update category changes
  useEffect(() => {
    if (initialCategory) {
      dispatch({ type: "SET_CATEGORY", payload: initialCategory });
    }
  }, [initialCategory]);

  // Handle Tutors
  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        let categoryId = undefined;

        // Get category ID
        if (filters.activeCategory !== "All Tutors") {
          const category = categories.find(
            (c) =>
              c.name.toLowerCase() === filters.activeCategory.toLowerCase(),
          );

          if (!category) {
            setTutors([]);
            setMeta({ page: 1, limit: 12, total: 0 });
            setLoading(false);
            return;
          }

          categoryId = category.id;
        }

        const response = await getAllTutors({
          page: filters.currentPage,
          limit: 12,
          search: filters.searchQuery,
          categoryId: categoryId,
          minPrice: filters.minPrice === "" ? undefined : filters.minPrice,
          maxPrice: filters.maxPrice === "" ? undefined : filters.maxPrice,
          sortBy: filters.sortBy,
          availability:
            filters.filterAvailability === "any"
              ? undefined
              : filters.filterAvailability,
        });

        if (response.success && response.data) {
          setTutors(response.data);
          if (response.meta) {
            setMeta(response.meta);
          }
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        toast.error("Error fetching tutors");
        setTutors([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch tutors initial
    if (categories.length > 0 || filters.activeCategory === "All Tutors") {
      fetchTutors();
    }
  }, [
    filters.activeCategory,
    filters.searchQuery,
    filters.sortBy,
    filters.minPrice,
    filters.maxPrice,
    filters.currentPage,
    categories,
  ]);

  // Dynamic category names
  const categoryNames = useMemo(() => {
    return ["All Tutors", ...categories.map((cat) => cat.name)];
  }, [categories]);

  // Handle Filtering
  const handleFilterChange = (
    type: string,
    value:
      | string
      | number
      | "experience"
      | "price_asc"
      | "price_desc"
      | "rating",
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
            | "experience"
            | "price_asc"
            | "price_desc"
            | "rating",
        });
        break;
      case "availability":
        dispatch({ type: "SET_AVAILABILITY", payload: value as string });
        break;
      case "minPrice":
        dispatch({ type: "SET_MIN_PRICE", payload: value as number | "" });
        break;
      case "maxPrice":
        dispatch({ type: "SET_MAX_PRICE", payload: value as number | "" });
        break;
    }
  };

  // Clear Filters
  const handleClearFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  //  Page Change
  const handlePageChange = (page: number) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  const totalPages = Math.ceil(meta.total / meta.limit) || 1;

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
              <TabsList className="bg-transparent p-0 gap-3 w-full justify-start overflow-x-auto  scrollbar-hide pb-2 *:data-[slot=tab-indicator]:hidden">
                {categoryNames.map((cat) => (
                  <TabsTab
                    key={cat}
                    value={cat}
                    className="h-10 rounded-full border border-border bg-background px-6 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:border-primary"
                  >
                    {cat}
                  </TabsTab>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Filters Section  */}
          <div className="mb-10">
            {/* Mobile Filter Trigger */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="max-w-xl flex gap-2">
                    <Filter className="w-4 h-4" />
                    Filter Tutors
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[540px] overflow-y-auto p-6"
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filter Tutors</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4">
                    <TutorFilter
                      searchQuery={filters.searchQuery}
                      onSearchChange={(value) =>
                        handleFilterChange("search", value)
                      }
                      sortBy={filters.sortBy}
                      onSortChange={(value) =>
                        handleFilterChange("sort", value)
                      }
                      filterAvailability={filters.filterAvailability}
                      onAvailabilityChange={(value) =>
                        handleFilterChange("availability", value)
                      }
                      layout="vertical"
                    />
                    <PriceFilter
                      minPrice={filters.minPrice}
                      maxPrice={filters.maxPrice}
                      onMinPriceChange={(val) =>
                        handleFilterChange("minPrice", val)
                      }
                      onMaxPriceChange={(val) =>
                        handleFilterChange("maxPrice", val)
                      }
                      fullWidth
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-col lg:flex-row gap-4 items-center">
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
              <PriceFilter
                minPrice={filters.minPrice}
                maxPrice={filters.maxPrice}
                onMinPriceChange={(val) => handleFilterChange("minPrice", val)}
                onMaxPriceChange={(val) => handleFilterChange("maxPrice", val)}
              />
            </div>
          </div>
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
          <TutorGrid tutors={tutors} onClearFilters={handleClearFilters} />
        )}

        {/* Pagination */}
        <TutorPagination
          currentPage={filters.currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={meta.total}
          itemsPerPage={meta.limit}
        />
      </div>
    </div>
  );
};

export default TutorCatalog;

//TODO:ONEK KAJ BAKI
