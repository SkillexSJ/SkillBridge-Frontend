import React from "react";
import { TutorResponse } from "@/service/tutor.service";
import { TutorCard } from "./TutorCard";

interface TutorGridProps {
  tutors: TutorResponse[];
  onClearFilters: () => void;
}

export const TutorGrid: React.FC<TutorGridProps> = ({
  tutors,
  onClearFilters,
}) => {
  if (tutors.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border">
        <h3 className="text-xl font-bold text-foreground mb-2">
          No tutors found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search terms.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-6 text-primary font-bold hover:underline"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {tutors.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};
