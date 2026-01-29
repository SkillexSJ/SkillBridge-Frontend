"use client";

import React from "react";
import { TutorDetailResponse } from "@/types/tutor.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TutorHeader } from "./TutorHeader";
import { TutorAbout } from "./TutorAbout";
import { TutorBookingSidebar } from "./TutorBookingSidebar";
import { TutorReviews } from "./TutorReviews";
import { TutorMentorship } from "./tutor-mentorship";

interface TutorProfileProps {
  tutor: TutorDetailResponse;
}

const TutorProfile: React.FC<TutorProfileProps> = ({ tutor }) => {
  const averageRating =
    tutor.reviews.length > 0
      ? tutor.reviews.reduce(
          (sum: number, review: any) => sum + review.rating,
          0,
        ) / tutor.reviews.length
      : 0;

  return (
    <div className="bg-black min-h-screen pb-20">
      {/* 1. HERO HEADER (Full Width) */}
      <TutorHeader tutor={tutor} averageRating={averageRating} />

      {/* 2. NAVIGATION TABS & CONTENT */}
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b border-zinc-800 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {" "}
            <TabsList className="bg-transparent h-auto p-0 flex gap-8 w-full justify-start rounded-none border-b-0">
              <TabsTrigger
                value="overview"
                className="py-5 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-none bg-transparent shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="py-5 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-none bg-transparent shadow-none flex items-center gap-2"
              >
                Reviews
                <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  {tutor.reviews.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="group"
                className="py-5 text-sm font-semibold border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:text-white text-zinc-500 hover:text-zinc-300 rounded-none bg-transparent shadow-none"
              >
                Group Mentorship
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* 3. MAIN CONTENT (Left Col) */}
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
              <TabsContent value="group" className="mt-0">
                <TutorMentorship tutor={tutor} />
              </TabsContent>
            </div>

            {/* 4. SIDEBAR WIDGETS (Right Col) */}
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
