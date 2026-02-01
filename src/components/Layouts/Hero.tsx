"use client";
/**
 * NODE PACKAGES
 */
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Search,
  Star,
  Users,
  ArrowUpRight,
  Layout,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * COMPONENTS
 */
import MagicBento, { MagicCard } from "@/components/MagicBento";
import { Input } from "@/components/ui/input";
import { GradientBars } from "./GradientLayout";
import { RevealOnScroll } from "../shared/reveal-on-scroll";

/**
 * SERVICES
 */
import { getAllCategories } from "@/service/category.service";

/**
 * TYPES
 */

import { toast } from "sonner";
import { Category } from "@/types/category.types";

const Hero = () => {
  const router = useRouter();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [suggestions, setSuggestions] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        toast.error("Failed to load categories for search suggestions");
      }
    };
    fetchCategories();
  }, []);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, categories]);

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/tutors?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/tutors");
    }
  };

  // Handle category select
  const handleCategorySelect = (categoryName: string) => {
    setSearchQuery(categoryName);
    setShowSuggestions(false);
    router.push(`/tutors?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* HERO HEADER SECTION - Full Width */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        {/* Gradient Background - Blended */}
        <div className="absolute inset-0 w-full h-full z-0">
          <GradientBars
            colors={["rgba(0,0,0,0)", "rgba(0, 178, 98, 0.3)", "rgba(0,0,0,0)"]}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
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
          <div
            ref={searchContainerRef}
            className="w-full max-w-2xl mx-auto p-2 bg-background/80 border border-primary/20 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center backdrop-blur-md shadow-xl shadow-primary/5 gap-2 relative z-50"
          >
            <div className="flex-1 flex items-center gap-2 px-4 w-full py-2 md:py-0 relative">
              <Search className="w-5 h-5 text-muted-foreground" />
              <div className="w-full relative">
                <Input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="border-none shadow-none focus-visible:ring-0 px-0 text-base h-auto placeholder:text-muted-foreground w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length > 0) setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                />

                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-4 w-full bg-popover border border-border rounded-xl shadow-lg overflow-hidden z-60">
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Suggested Categories
                      </p>
                      {suggestions.map((cat) => (
                        <div
                          key={cat.id}
                          className="px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-lg flex items-center gap-2 transition-colors"
                          onClick={() => handleCategorySelect(cat.name)}
                        >
                          <Search className="w-3 h-3 text-muted-foreground" />
                          {cat.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl md:rounded-full transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* MAGIC BENTO SECTION */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <RevealOnScroll>
          <MagicBento className={""} glowColor="0, 178, 99">
            {/* CARD 1: MENTOR STATS */}
            <MagicCard
              className="min-h-62.5 flex flex-col justify-between p-5 md:p-8"
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
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    200K+
                  </h3>
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
              className="min-h-62.5 flex flex-col justify-between p-5 md:p-8"
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
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    500K+
                  </h3>
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
              className="hidden md:flex min-h-62.5 relative group overflow-hidden"
              glowColor="0, 178, 98"
              clickEffect={true}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop"
                  alt="Mentoring"
                  fill
                  className="object-cover grayscale  transition-opacity duration-500"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Book a Session
                </h3>
                <p className="text-zinc-300 text-sm mb-6">
                  Get your first mentorship session for free. Instant booking
                  with top experts.
                </p>
                <button className="w-full py-4 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </MagicCard>

            {/* CARD 4: LEADERSHIP BRAND / CATEGORIES (Bottom Left) */}
            <MagicCard
              className="col-span-1 md:col-span-2 min-h-[280px] p-8 flex flex-col justify-center"
              glowColor="0, 178, 98"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Side */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none uppercase">
                    EXPLORE <span className="text-primary/80">Your</span> <br />
                    <span className="flex items-center justify-center md:justify-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 block" />{" "}
                      <span className="w-8 h-8 rounded-full bg-zinc-300 border border-zinc-400 dark:bg-zinc-700 dark:border-zinc-600 block -ml-6" />
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
                        DESIRED
                      </span>
                    </span>
                    SKILLS
                  </h3>
                </div>

                {/* Right Side */}
                <div className="flex-1 flex flex-wrap gap-2 justify-end content-center">
                  {[
                    "Development",
                    "Design",
                    "Marketing",
                    "Business",
                    "Science",
                    "Music",
                    "Cooking",
                    "Fitness",
                    "Health",
                    "Education",
                    "Finance",
                    "Law",
                    "Engineering",
                    "Art",
                    "Craft",
                    "Photography",
                  ].map((cat) => (
                    <span
                      key={cat}
                      className="px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 dark:bg-zinc-900/50 dark:border-zinc-800 dark:text-zinc-400 text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors cursor-pointer"
                    >
                      {cat}
                    </span>
                  ))}
                  <div className="w-full mt-4 flex justify-end">
                    <Link
                      href="/tutors"
                      className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white hover:text-primary transition-colors"
                    >
                      View All Categories <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </MagicCard>
          </MagicBento>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default Hero;
