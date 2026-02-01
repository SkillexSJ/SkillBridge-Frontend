"use client";

/**
 * NODE PACKAGES
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star, Loader2 } from "lucide-react";

/**
 * COMPONENTS
 */
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";

/**
 * HOOKS
 */
import { usePopularTutors } from "@/hooks/usePopularTutors";

const PopularTutors: React.FC = () => {
  // use custom hook for hybrid caching
  const { tutors, categories, loading } = usePopularTutors();

  // Slice to limit tabs if needed
  const displayedCategories = categories.slice(0, 4);

  const categoryNames = ["All", ...displayedCategories.map((c) => c.name)];

  if (loading) {
    return (
      <section className="py-20 relative overflow-hidden flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Grid Pattern for texture */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="All" className="flex flex-col gap-12">
          {/* Header & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Popular <span className="text-primary">Mentors</span>
            </h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center">
              <TabsList
                variant="underline"
                className="bg-transparent p-0 gap-6"
              >
                {categoryNames.map((catName) => (
                  <TabsTab
                    key={catName}
                    value={catName}
                    className="text-muted-foreground data-active:text-foreground text-lg px-0 bg-transparent hover:text-foreground/80 transition-colors cursor-pointer"
                  >
                    {catName}
                  </TabsTab>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Cards Grid Panels */}
          {categoryNames.map((catName) => {
            const filteredMentors =
              catName === "All"
                ? tutors
                : tutors.filter((m) => m.category?.name === catName);

            return (
              <TabsPanel
                key={catName}
                value={catName}
                className="animate-in fade-in-50 duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.length > 0 ? (
                    filteredMentors.slice(0, 6).map((mentor) => (
                      <Link
                        href={`/tutors/${mentor.id}`}
                        key={mentor.id}
                        className="group relative h-125 rounded-4xl overflow-hidden border border-border/50 bg-card cursor-pointer block"
                      >
                        {/* Image */}
                        <Image
                          fill
                          src={mentor.user.image || "/placeholder-user.jpg"}
                          alt={mentor.user.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                        />

                        {/* Dark Overlay Gradient */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />

                        {/* Top Badges */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                          <span className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/10 tracking-wide">
                            {mentor.specialty ||
                              mentor.category?.name ||
                              "Tutor"}
                          </span>
                          <span className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1.5">
                            {mentor.averageRating
                              ? mentor.averageRating.toFixed(1)
                              : "New"}{" "}
                            <Star className="w-3 h-3 text-primary fill-primary" />
                          </span>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                          <div>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-1.5">
                              {mentor.user.name}
                            </h3>
                            <p className="text-white/60 text-xs font-medium tracking-wide uppercase">
                              {mentor.experience}
                            </p>
                            <p className="text-primary text-sm font-semibold mt-1">
                              ${mentor.hourlyRate}/hr
                            </p>
                          </div>
                          <button className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform group-hover:rotate-45 shadow-lg shadow-primary/20">
                            <ArrowUpRight className="w-6 h-6" />
                          </button>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                      No mentors found in this category.
                    </div>
                  )}
                </div>
              </TabsPanel>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default PopularTutors;
