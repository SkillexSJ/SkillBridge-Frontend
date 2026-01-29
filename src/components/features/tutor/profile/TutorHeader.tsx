/**
 * NODE PACKAGES
 */
import React from "react";
import {
  MapPin,
  Heart,
  Share2,
  MessageSquare,
  Star,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Image from "next/image";

/**
 * TYPES
 */
import { TutorDetailResponse } from "@/types/tutor.types";

/**
 * INTERFACE
 */
interface TutorHeaderProps {
  tutor: TutorDetailResponse;
  averageRating: number;
}

export const TutorHeader: React.FC<TutorHeaderProps> = ({
  tutor,
  averageRating,
}) => {
  return (
    <div className="relative bg-card/50 border-b border-border pb-8">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full relative overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-background"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3f3f4620_1px,transparent_1px),linear-gradient(to_bottom,#3f3f4620_1px,transparent_1px)] bg-size-[40px_40px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Profile Identity */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-background bg-card overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300 relative">
                <Image
                  src={tutor.user.image || "/placeholder-avatar.jpg"}
                  alt={tutor.user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-1.5 rounded-lg border-4 border-background shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2 flex items-center justify-center md:justify-start gap-3 tracking-tight">
                {tutor.user.name}
              </h1>
              <p className="text-xl text-primary font-medium mb-2">
                {tutor.category.name}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-muted-foreground text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{tutor.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>{tutor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center justify-center w-full md:w-auto gap-3 mt-4 md:mt-20">
            <div className="flex flex-col items-end mr-4 px-4 border-r border-border">
              <div className="flex items-center gap-1.5 text-foreground font-bold text-xl">
                {averageRating.toFixed(1)}
                <Star className="w-5 h-5 text-primary fill-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {tutor.reviews.length} Reviews
              </span>
            </div>

            <div className="flex gap-2">
              <button className="p-3 bg-card hover:bg-accent text-muted-foreground hover:text-foreground rounded-xl border border-border transition-all">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-3 bg-card hover:bg-accent text-muted-foreground hover:text-red-500 rounded-xl border border-border transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 bg-card hover:bg-accent text-muted-foreground hover:text-foreground rounded-xl border border-border transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
