/**
 * NODE PACKAGES
 */
import React from "react";
import { Clock, Trophy, Linkedin, Twitter, Globe, Code } from "lucide-react";

/**
 * TYPES
 */
import { TutorDetailResponse } from "@/types/tutor.types";

/**
 * INTERFACE
 */
interface TutorAboutProps {
  tutor: TutorDetailResponse;
  averageRating: number;
}

export const TutorAbout: React.FC<TutorAboutProps> = ({
  tutor,
  averageRating,
}) => {
  return (
    <div className="space-y-12">
      {/* Biography */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full block"></span>
          About Me
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
          {tutor.bio}
        </p>
      </section>

      {/* Profile Insights */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full block"></span>
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors group">
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">
                Highly Responsive
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Usually responds within{" "}
                <span className="text-primary font-medium">24 hours</span>
              </p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors group">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">
                {averageRating >= 4.5
                  ? "Top Rated Mentor"
                  : "Experienced Mentor"}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {averageRating.toFixed(1)} average rating from{" "}
                {tutor.reviews.length} reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      {tutor.expertise && tutor.expertise.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full block"></span>
            Tech Stack & Expertise
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-wider font-bold mb-4">
                <Code className="w-4 h-4" /> Core Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {tutor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground text-sm font-medium hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
