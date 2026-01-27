"use client";

import React from "react";
import {
  ArrowRight,
  Search,
  Star,
  Users,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center pt-24 pb-12 lg:pt-32 lg:pb-24">
      {/* Background Grid Pattern */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10  w-full">
        {/* HERO HEADER CONTENT */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6 lg:mb-8">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs lg:text-sm font-medium text-foreground/80">
              Connect with Expert Tutors, Learn Anything
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
            Master a New Skill with{" "}
            <span className="text-primary">Expert Tutors</span>
          </h1>

          {/* Subhead */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 lg:mb-10 leading-relaxed px-4">
            Instant booking. Verified experts. Enhance your skills and grow with
            personalized mentorship.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl mx-auto p-2 bg-background/80 border border-primary/20 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center backdrop-blur-md shadow-xl shadow-primary/5 gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 w-full border-b md:border-b-0 md:border-r border-primary/10 py-2 md:py-0">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="What do you want to learn?"
                className="w-full bg-transparent border-none text-foreground placeholder-muted-foreground focus:ring-0 text-sm sm:text-base py-1"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 w-full py-2 md:py-0">
              <input
                type="text"
                placeholder="Select Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="w-full bg-transparent border-none text-foreground placeholder-muted-foreground focus:ring-0 text-sm sm:text-base py-1"
              />
            </div>
            <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl md:rounded-full transition-all shadow-lg shadow-primary/20 active:scale-95">
              Search
            </button>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {/* LEFT COLUMN GROUP */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
            {/* Top Row Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {/* Mentors Card */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
                <div className="mb-2 sm:mb-4">
                  <h3 className="text-2xl sm:text-4xl font-bold text-emerald-400 mb-1">
                    207K
                  </h3>
                  <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                    Mentors
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed hidden sm:block">
                  Expert mentors ready to guide you on your journey.
                </p>
              </div>

              {/* Active Users Card */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-sm hover:border-zinc-700 transition-colors group">
                <div className="mb-2 sm:mb-4">
                  <h3 className="text-2xl sm:text-4xl font-bold text-emerald-400 mb-1">
                    500K
                  </h3>
                  <span className="text-xs sm:text-sm text-zinc-400 font-medium">
                    Active users
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed hidden sm:block">
                  Users who have successfully found their ideal mentor.
                </p>
              </div>
            </div>

            {/* Bottom Row Banner */}
            <div className="flex-1 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden group">
              {/* Abstract Glow in card */}
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex -space-x-3">
                    <Image
                      width={2}
                      height={8}
                      className="w-8 h-8 rounded-full border-2 border-zinc-900"
                      src="https://i.pravatar.cc/100?img=1"
                      alt="User"
                    />
                    <Image
                      width={2}
                      height={8}
                      className="w-8 h-8 rounded-full border-2 border-zinc-900"
                      src="https://i.pravatar.cc/100?img=2"
                      alt="User"
                    />
                    <Image
                      width={2}
                      height={8}
                      className="w-8 h-8 rounded-full border-2 border-zinc-900"
                      src="https://i.pravatar.cc/100?img=3"
                      alt="User"
                    />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase leading-tight tracking-wide">
                  Unlock <span className="text-emerald-400">your</span> <br />
                  leadership <br />
                  potential with us!
                </h3>
              </div>

              <button className="relative z-10 h-12 w-12 sm:h-14 sm:w-14 rounded-full border border-zinc-600 hover:border-emerald-400 hover:bg-emerald-500/10 flex items-center justify-center transition-all group-hover:scale-110">
                <ArrowRight className="text-white group-hover:text-emerald-400" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN LARGE CARD */}
          <div className="lg:col-span-5 bg-zinc-900/80 border border-zinc-800/60 rounded-2xl sm:rounded-3xl overflow-hidden relative group min-h-[300px] lg:min-h-0">
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col z-20 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-none">
              <div className="mb-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  Book your first <br /> free meeting
                </h3>
                <p className="text-zinc-400 text-sm">
                  Get insights into the process and next steps.
                </p>
              </div>

              <button className="flex items-center gap-2 text-emerald-400 font-medium hover:gap-3 transition-all mt-6 lg:mt-0">
                Get In Touch <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image container with mask/positioning */}
            <div className="absolute right-0 bottom-0 w-[85%] h-[80%] lg:w-full lg:h-[85%] z-10">
              <img
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Mentor"
                className="w-full h-full object-cover object-top mask-image-b-fade"
                style={{
                  maskImage:
                    "linear-gradient(to top, black 80%, transparent 100%)",
                }} // Attempting a fade at top of image
              />
              {/* Grayscale filter that removes on hover */}
              <div className="absolute inset-0 bg-zinc-900/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-500"></div>
            </div>

            {/* Gradient overlay for text readability on the image bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
