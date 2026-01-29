import { ArrowRight, Hash } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/service/category.service";
import { Category } from "@/types/types";

const FeaturedCategory = async () => {
  let categories: Category[] = [];

  try {
    const response = await getAllCategories();
    if (response.success) {
      categories = response.data;
    }
  } catch (error) {
    console.error("Failed to load categories", error);
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
            Explore Top <span className="text-primary">Categories</span>
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
        {categories.map((category) => {
          // Using a common icon as requested
          const IconComponent = Hash;

          return (
            <Link
              key={category.id}
              href={`/tutors?category=${category.name.toLowerCase()}`}
              className="group relative rounded-2xl overflow-hidden  bg-background border border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                  )}
                >
                  <IconComponent className={cn("w-6 h-6 text-primary")} />
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category._count?.tutorProfiles || 0} Tutors
                  </p>
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          );
        })}
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
