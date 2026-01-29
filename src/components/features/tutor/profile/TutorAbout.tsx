import React from "react";
import { TutorDetailResponse } from "@/types/tutor.types";
import { Clock, Trophy, Linkedin, Twitter, Globe, Code } from "lucide-react";

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
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-500 rounded-full block"></span>
          About Me
        </h2>
        <p className="text-zinc-400 leading-relaxed whitespace-pre-line text-lg">
          {tutor.bio}
        </p>

        {tutor.socialLinks && tutor.socialLinks.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-8">
            {tutor.socialLinks.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 hover:bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-800"
              >
                <Globe className="w-4 h-4" /> {link.platform || "Link"}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Profile Insights */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-emerald-500 rounded-full block"></span>
          Key Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4 hover:border-emerald-500/30 transition-colors group">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                Highly Responsive
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                Usually responds within{" "}
                <span className="text-emerald-400 font-medium">24 hours</span>
              </p>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-start gap-4 hover:border-emerald-500/30 transition-colors group">
            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">
                {averageRating >= 4.5
                  ? "Top Rated Mentor"
                  : "Experienced Mentor"}
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
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
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-emerald-500 rounded-full block"></span>
            Tech Stack & Expertise
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-sm text-zinc-500 uppercase tracking-wider font-bold mb-4">
                <Code className="w-4 h-4" /> Core Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {tutor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all cursor-default"
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
