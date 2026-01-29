"use client";

/**
 * NODE PACKAGES
 */
import React from "react";

/**
 * TYPES
 */
import { TutorDetailResponse } from "@/types/tutor.types";

/**
 * COMPONENTS
 */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TutorHeader } from "./TutorHeader";
import { TutorAbout } from "./TutorAbout";
import { TutorBookingSidebar } from "./TutorBookingSidebar";
import { TutorReviews } from "./TutorReviews";

/**
 * INTERFACE
 */
interface TutorProfileProps {
  tutor: TutorDetailResponse;
}

const TutorProfile: React.FC<TutorProfileProps> = ({ tutor }) => {
  const averageRating = tutor.averageRating || 0;

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* 1. HERO HEADER  */}
      <TutorHeader tutor={tutor} averageRating={averageRating} />

      {/* 2. NAVIGATION TABS */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-border bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            <TabsList className="bg-transparent h-auto p-0 flex gap-8 w-full justify-start rounded-none border-b-0">
              <TabsTrigger
                value="overview"
                className="py-5 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground rounded-none bg-transparent shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="py-5 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground rounded-none bg-transparent shadow-none flex items-center gap-2"
              >
                Reviews
                <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-md text-[10px] font-bold">
                  {tutor.reviews.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 3. MAIN CONTENT */}
            <div className="lg:col-span-2">
              <TabsContent value="overview" className="mt-0">
                <TutorAbout tutor={tutor} averageRating={averageRating} />
              </TabsContent>
              <TabsContent value="reviews" className="mt-0">
                <TutorReviews
                  reviews={tutor.reviews}
                  averageRating={averageRating}
                />
              </TabsContent>
            </div>

            {/* 4. SIDEBAR WIDGETS */}
            <div className="lg:col-span-1">
              <TutorBookingSidebar
                tutor={tutor}
                availabilitySlots={tutor.availabilitySlots || []}
              />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default TutorProfile;
