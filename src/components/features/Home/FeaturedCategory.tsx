"use client";

import React from "react";
import {
  Code2,
  Palette,
  Briefcase,
  TrendingUp,
  Music,
  Globe2,
  Atom,
  Camera,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: 1,
    name: "Development",
    count: "1.2k+ Tutors",
    icon: Code2,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=development",
  },
  {
    id: 2,
    name: "Design",
    count: "850+ Tutors",
    icon: Palette,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=design",
  },
  {
    id: 3,
    name: "Business",
    count: "2.1k+ Tutors",
    icon: Briefcase,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=business",
  },
  {
    id: 4,
    name: "Marketing",
    count: "900+ Tutors",
    icon: TrendingUp,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=marketing",
  },
  {
    id: 5,
    name: "Music",
    count: "500+ Tutors",
    icon: Music,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=music",
  },
  {
    id: 6,
    name: "Languages",
    count: "3.5k+ Tutors",
    icon: Globe2,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=languages",
  },
  {
    id: 7,
    name: "Science",
    count: "750+ Tutors",
    icon: Atom,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=science",
  },
  {
    id: 8,
    name: "Photography",
    count: "400+ Tutors",
    icon: Camera,
    color: "text-primary",
    bg: "",
    href: "/tutors?category=photography",
  },
];

const FeaturedCategory = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Explore Top Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our most popular categories and find the perfect mentor to
            help you master new skills.
          </p>
        </div>
        <Link
          href="/categories"
          className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative rounded-2xl overflow-hidden  bg-background border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
          >
            <div className="flex flex-col gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                  category.bg,
                )}
              >
                <category.icon className={cn("w-6 h-6", category.color)} />
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.count}
                </p>
              </div>
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </Link>
        ))}
      </div>

      <div className="mt-8 md:hidden flex justify-center">
        <Link
          href="/categories"
          className="flex items-center gap-2 text-primary font-semibold"
        >
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCategory;
