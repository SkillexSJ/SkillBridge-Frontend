/**
 * NODE PACKAGES
 */
import {
  ArrowRight,
  Code,
  PenTool,
  Briefcase,
  Megaphone,
  Languages,
  Music,
  Database,
  FlaskConical,
  Camera,
} from "lucide-react";
import Link from "next/link";
/**
 * LIBS
 */
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "coding",
    name: "Coding",
    icon: Code,
    count: "350 Tutors",
    href: "/tutors?category=Coding",
  },
  {
    id: "design",
    name: "Design",
    icon: PenTool,
    count: "210 Tutors",
    href: "/tutors?category=Design",
  },
  {
    id: "business",
    name: "Business",
    icon: Briefcase,
    count: "180 Tutors",
    href: "/tutors?category=Business",
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: Megaphone,
    count: "145 Tutors",
    href: "/tutors?category=Marketing",
  },
  {
    id: "language",
    name: "Language",
    icon: Languages,
    count: "420 Tutors",
    href: "/tutors?category=Language",
  },
  {
    id: "music",
    name: "Music",
    icon: Music,
    count: "85 Tutors",
    href: "/tutors?category=Music",
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: Database,
    count: "110 Tutors",
    href: "/tutors?category=Data Science",
  },
  {
    id: "science",
    name: "Science",
    icon: FlaskConical,
    count: "95 Tutors",
    href: "/tutors?category=Science",
  },
  {
    id: "photography",
    name: "Photography",
    icon: Camera,
    count: "65 Tutors",
    href: "/tutors?category=Photography",
  },
];

const FeaturedCategory = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Explore <span className="text-primary">Categories</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Find the perfect tutor for your specific needs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = category.icon;

          return (
            <Link
              key={category.id}
              href={category.href}
              className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border/60 hover:border-primary/50 transition-all duration-300 hover:bg-card hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 dark:bg-card/50 dark:border-border/50"
            >
              {/* Icon Circle */}
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 bg-muted/50 group-hover:bg-primary/10",
                )}
              >
                <IconComponent
                  className={cn(
                    "w-7 h-7 text-primary/80 group-hover:text-primary transition-colors",
                  )}
                />
              </div>

              {/* Text */}
              <div className="text-center">
                <h3 className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {category.count}
                </p>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
        >
          View All Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedCategory;
