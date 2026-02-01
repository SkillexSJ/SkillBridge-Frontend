/**
 * COMPONENTS
 */

import FeaturedCategory from "@/components/features/Home/FeaturedCategory";
import Hero from "@/components/Layouts/Hero";
import { LogoCloud } from "@/components/features/Home/logo-cloud";
import { TestimonialsMarqueeDemo2 } from "@/components/features/Home/Testimonials";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import PopularTutors from "@/components/features/Home/PopularTutor";

export default async function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col">
        <RevealOnScroll>
          <Hero />
        </RevealOnScroll>

        {/* Trusted By Section - Overlapping Hero */}

        <section className="w-full rounded-t-[2.5rem] md:rounded-t-[5rem] mt-5 border-t border-primary/50 shadow-[0_-20px_80px_-20px_rgba(0,178,98,0.5)] dark:shadow-[0_-20px_80px_-20px_rgba(0,178,98,0.3)] bg-background relative z-10">
          <div className="px-4 sm:px-6 mb-5 lg:px-8 pt-16 pb-8 text-center">
            <p className="text-xs md:text-sm font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-500 via-gray-900 to-gray-500 dark:from-gray-400 dark:via-white dark:to-gray-400 uppercase tracking-[0.3em] mb-12 opacity-90 drop-shadow-sm">
              Trusted by leading companies and institutions
            </p>
            <div className="w-full">
              <LogoCloud />
            </div>
          </div>

          <RevealOnScroll>
            <FeaturedCategory />
          </RevealOnScroll>
          <RevealOnScroll>
            <PopularTutors />
          </RevealOnScroll>
          <RevealOnScroll>
            <TestimonialsMarqueeDemo2 />
          </RevealOnScroll>
        </section>
      </main>
    </>
  );
}
