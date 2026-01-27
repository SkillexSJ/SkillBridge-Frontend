"use client";

import React from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import Image from "next/image";

const MENTORS = [
  {
    id: 1,
    name: "Ethan Caldwell",
    role: "Python Developer",
    category: "Science & Technology",
    rating: 4.9,
    experience: "20 years of experience",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Adriana Silva",
    role: "UI/UX Designer",
    category: "UI/UX",
    rating: 5.0,
    experience: "15 years of experience",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Data Scientist",
    category: "Science & Technology",
    rating: 4.8,
    experience: "12 years of experience",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Sarah Chen",
    role: "Investment Banker",
    category: "Finance & Investment",
    rating: 4.9,
    experience: "10 years of experience",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Michael Torres",
    role: "Product Designer",
    category: "UI/UX",
    rating: 4.7,
    experience: "8 years of experience",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "All",
  "UI/UX",
  "Science & Technology",
  "Finance & Investment",
];

const PopularTutors: React.FC = () => {
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
                {CATEGORIES.map((cat) => (
                  <TabsTab
                    key={cat}
                    value={cat}
                    className="text-muted-foreground data-active:text-foreground text-lg px-0 bg-transparent hover:text-foreground/80 transition-colors"
                  >
                    {cat}
                  </TabsTab>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Cards Grid Panels */}
          {CATEGORIES.map((cat) => {
            const filteredMentors =
              cat === "All"
                ? MENTORS
                : MENTORS.filter((m) => m.category === cat);

            return (
              <TabsPanel
                key={cat}
                value={cat}
                className="animate-in fade-in-50 duration-500"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.length > 0 ? (
                    filteredMentors.map((mentor) => (
                      <div
                        key={mentor.id}
                        className="group relative h-125 rounded-4xl overflow-hidden border border-border/50 bg-card cursor-pointer"
                      >
                        {/* Image */}
                        <Image
                          fill
                          src={mentor.image}
                          alt={mentor.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                        />

                        {/* Dark Overlay Gradient - Stronger at bottom */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />

                        {/* Top Badges */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                          <span className="bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/10 tracking-wide">
                            {mentor.role}
                          </span>
                          <span className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full text-xs font-bold text-white border border-white/10 flex items-center gap-1.5">
                            {mentor.rating}{" "}
                            <Star className="w-3 h-3 text-primary fill-primary" />
                          </span>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                          <div>
                            <h3 className="text-2xl font-bold text-white leading-tight mb-1.5">
                              {mentor.name}
                            </h3>
                            <p className="text-white/60 text-xs font-medium tracking-wide uppercase">
                              {mentor.experience}
                            </p>
                          </div>
                          <button className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform group-hover:rotate-45 shadow-lg shadow-primary/20">
                            <ArrowUpRight className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
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
