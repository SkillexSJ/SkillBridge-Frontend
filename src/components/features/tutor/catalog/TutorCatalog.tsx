"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MENTORS, CATEGORIES as CATEGORY_DATA } from "@/constants/constants";
import { Tutor } from "@/types/types";
import { TutorFilter } from "./TutorFilter";
import { TutorGrid } from "./TutorGrid";
import { TutorPagination } from "./TutorPagination";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";

// Extract category names from constants + "All Tutors"
const CATEGORY_NAMES = ["All Tutors", ...CATEGORY_DATA.map((c) => c.name)];

interface TutorCatalogProps {
  initialCategory?: string;
}

const TutorCatalog: React.FC<TutorCatalogProps> = ({
  initialCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState("All Tutors");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "recommended" | "price_low" | "price_high" | "rating"
  >("recommended");
  const [filterAvailability, setFilterAvailability] = useState("any");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Effect to update active category if initialCategory prop changes
  useEffect(() => {
    if (initialCategory && CATEGORY_NAMES.includes(initialCategory)) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter and Sort Logic
  const filteredTutors = useMemo(() => {
    let result = [...MENTORS];

    // Category Filter
    if (activeCategory !== "All Tutors") {
      result = result.filter(
        (t) =>
          t.specialty === activeCategory ||
          t.role.includes(activeCategory) ||
          t.expertise.some((e) => e.includes(activeCategory)),
      );
    }

    // Search Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q) ||
          t.specialty.toLowerCase().includes(q),
      );
    }

    // Availability (Mock logic)
    if (filterAvailability === "today") {
      result = result.filter((t) => t.responseTime.includes("hr"));
    }

    // Sorting
    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "price_high":
        result.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, filterAvailability]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, filterAvailability, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const paginatedTutors = filteredTutors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList
                variant="underline"
                className="bg-transparent p-0 gap-6 w-full justify-start overflow-x-auto scrollbar-hide border-b border-border pb-px"
              >
                {CATEGORY_NAMES.map((cat) => (
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
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterAvailability={filterAvailability}
            setFilterAvailability={setFilterAvailability}
          />
        </div>

        {/* Grid */}
        <TutorGrid
            tutors={paginatedTutors}
            onClearFilters={() => {
                setSearchQuery("");
                setActiveCategory("All Tutors");
                setFilterAvailability("any");
                setSortBy("recommended");
            }}
        />

        {/* Pagination */}
        <TutorPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredTutors.length}
            itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default TutorCatalog;
