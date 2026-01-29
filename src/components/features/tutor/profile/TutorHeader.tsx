import React from "react";
import { TutorDetailResponse } from "@/types/tutor.types";
import {
  MapPin,
  Heart,
  Share2,
  MessageSquare,
  Star,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface TutorHeaderProps {
  tutor: TutorDetailResponse;
  averageRating: number;
}

export const TutorHeader: React.FC<TutorHeaderProps> = ({
  tutor,
  averageRating,
}) => {
  return (
    <div className="relative bg-zinc-900/50 border-b border-zinc-800 pb-8">
      {/* Banner/Cover */}
      <div className="h-48 md:h-64 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-black"></div>

        {/* Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3f3f4620_1px,transparent_1px),linear-gradient(to_bottom,#3f3f4620_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          {/* Profile Identity */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-black bg-zinc-800 overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <img
                  src={tutor.user.image || "/logo.svg"}
                  alt={tutor.user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-1.5 rounded-lg border-4 border-black shadow-lg">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-3 tracking-tight">
                {tutor.user.name}
              </h1>
              <p className="text-xl text-emerald-400 font-medium mb-2">
                {tutor.category.name}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-zinc-400 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-zinc-500" />
                  <span>{tutor.location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-zinc-500" />
                  <span>{tutor.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3 mt-4 md:mt-20">
            <div className="flex flex-col items-end mr-4 px-4 border-r border-zinc-800">
              <div className="flex items-center gap-1.5 text-white font-bold text-xl">
                {averageRating.toFixed(1)}
                <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
              </div>
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                {tutor.reviews.length} Reviews
              </span>
            </div>

            <div className="flex gap-2">
              <button className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-xl border border-zinc-800 transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
