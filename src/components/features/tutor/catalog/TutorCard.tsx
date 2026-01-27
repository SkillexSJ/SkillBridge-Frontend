import React from "react";
import { Tutor } from "@/types/types";
import { Star, CheckCircle2, Users, MonitorPlay, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TutorCardProps {
  tutor: Tutor;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="group relative w-full aspect-3/4 rounded-3xl overflow-hidden cursor-pointer border border-border bg-card">
      {/* 1. Full Background Image */}
      {/* Using img tag as per design reference, but ensuring it handles object-cover properly */}
      <Image
        src={tutor.imageUrl}
        alt={tutor.name}
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Top Right Stats Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-bold text-white">
            {tutor.rating}
          </span>
        </div>
      </div>

      {/* 2. Floating Bottom Panel */}
      <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl transition-all duration-300 group-hover:border-primary/30">
        {/* Header: Name & Role */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-card-foreground tracking-tight">
                {tutor.name}
              </h3>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/20" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              {tutor.role}
            </p>
          </div>
        </div>

        {/* Expandable Section: Bio, Stats & Action */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out">
          <div className="overflow-hidden">
            <div className="pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed font-light">
                {tutor.about}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span
                    className="flex items-center gap-1.5"
                    title="Review Count"
                  >
                    <Users className="w-3.5 h-3.5" /> {tutor.reviewCount}
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    title="Total Sessions"
                  >
                    <MonitorPlay className="w-3.5 h-3.5" />{" "}
                    {tutor.totalSessions}+
                  </span>
                </div>

                <Link href={`/tutors/${tutor.id}`}>
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-bold px-4 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer">
                    Follow <Sparkles className="w-2.5 h-2.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Hint */}
        <div className="flex justify-between items-center mt-2 group-hover:hidden transition-all duration-200">
          <span className="text-primary font-bold text-sm">
            ${tutor.hourlyRate}/hr
          </span>
        </div>
      </div>
    </div>
  );
};
