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

        <section className=" w-full rounded-t-[2.5rem] md:rounded-t-[5rem] mt-5 border-t border-primary shadow-[0_-10px_50px_-20px_rgba(0,0,0,0.1)]">
          <div className="px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
            <p className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-8">
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
