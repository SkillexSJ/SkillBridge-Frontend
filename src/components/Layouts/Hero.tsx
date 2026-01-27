"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Search,
  Star,
  Users,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Layout,
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
            {/* CARD 1: MENTOR STATS */}
            <MagicCard
              className="min-h-62.5 flex flex-col justify-between"
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
                  <h3 className="text-4xl font-bold text-foreground mb-2">200K+</h3>
                  <p className="text-muted-foreground text-sm">
                    Verified expert mentors globally.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  Expert Network
                </span>
              </div>
            </MagicCard>

            {/* CARD 2: USER STATS */}
            <MagicCard
              className="min-h-62.5 flex flex-col justify-between"
              glowColor="0, 178, 98"
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-2">500K+</h3>
                  <p className="text-muted-foreground text-sm">
                    Active learners mastering new skills.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  Global Community
                </span>
              </div>
            </MagicCard>

            {/* CARD 3: BOOKING CTA (Right Vertical) */}
            <MagicCard
              className="min-h-62.5 relative group"
              glowColor="0, 178, 98"
              clickEffect={true}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
                  alt="Mentoring"
                  fill
                  className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-2">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Book a Session
                </h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Get your first mentorship session for free. Instant booking with top experts.
                </p>
                <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </MagicCard>

            {/* CARD 4: LEADERSHIP BRAND / CATEGORIES (Bottom Left) */}
            <MagicCard
              className="min-h-62.5 flex flex-col justify-between"
              glowColor="0, 178, 98"
            >
              <div className="flex flex-row h-full items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="p-3 w-fit rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                    <Layout className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Explore Categories
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Choose from over 50+ subjects and professional skills taught by industry leaders.
                  </p>
                </div>
                
                <div className="flex-1 flex flex-wrap gap-3 justify-end">
                  {["Development", "Design", "Marketing", "Business", "Music", "Science", "Math", "English"].map(
                    (cat) => (
                      <span
                        key={cat}
                        className="px-4 py-2 rounded-xl bg-accent/50 border border-border text-sm text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                      >
                        {cat}
                      </span>
                    )
                  )}
                </div>
              </div>
            </MagicCard>
          </MagicBento>
        </div>
      </div>
    </div>
  );
};

export default Hero;
