"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Search,
  Star,
  Users,
  ArrowUpRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import Image from "next/image";
import MagicBento, { MagicCard } from "@/components/MagicBento";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Hero = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

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
          <div className="w-full max-w-3xl mx-auto p-2 bg-background/80 border border-primary/20 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center backdrop-blur-md shadow-xl shadow-primary/5 gap-2 relative z-50">
            <div className="flex-1 flex items-center gap-2 px-4 w-full border-b md:border-b-0 md:border-r border-primary/10 py-2 md:py-0">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="What do you want to learn?"
                className="border-none shadow-none focus-visible:ring-0 px-0 text-base h-auto placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 px-4 w-full py-2 md:py-0 relative">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Input
                    type="text"
                    readOnly
                    placeholder="Select Date"
                    value={date ? date.toLocaleDateString() : ""}
                    className="border-none shadow-none focus-visible:ring-0 px-0 text-base h-auto placeholder:text-muted-foreground cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                    className="rounded-xl border bg-background shadow-2xl"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl md:rounded-full transition-all shadow-lg shadow-primary/20 active:scale-95">
              Search
            </button>
          </div>
        </div>

        {/* MAGIC BENTO SECTION */}
        <div className="w-full max-w-6xl mx-auto">
          <MagicBento glowColor="0, 178, 98">
            {/* CARD 1: STATS */}
            <MagicCard
              className="col-span-12 md:col-span-4 min-h-62.5 flex flex-col justify-between"
              glowColor="0, 178, 98"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">200K+</h3>
                  <p className="text-muted-foreground text-sm">
                    Expert mentors helping students globally.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  Active Learners
                </span>
                <span className="text-sm font-bold text-primary">500K+</span>
              </div>
            </MagicCard>

            {/* CARD 2: COMMUNITY */}
            <MagicCard
              className="col-span-12 md:col-span-4 min-h-62.5 flex flex-col justify-between"
              glowColor="0, 178, 98"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Unlock Potential
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Join a community of learners and leaders.
                </p>

                <div className="flex items-center -space-x-3 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    +4k
                  </div>
                </div>
              </div>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 group">
                Join Community{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </MagicCard>

            {/* CARD 3: BOOKING CTA */}
            <MagicCard
              className="col-span-12 md:col-span-4 min-h-62.5 relative group"
              glowColor="0, 178, 98"
              clickEffect={true}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Mentoring"
                  fill
                  className="object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Book a Session
                </h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Get your first mentorship session for free.
                </p>
                <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-colors flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </MagicCard>
          </MagicBento>
        </div>
      </div>
    </div>
  );
};

export default Hero;
