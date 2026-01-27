import PopularTutors from "@/components/features/Home/PopularTutor";
import Hero from "@/components/Layouts/Hero";
import { LogoCloud } from "@/components/logo-cloud";

export default async function Home() {
  return (
    <>
      <main className="min-h-screen max-w-7xl mx-auto">
        <Hero />

        {/* Trusted By Section - Overlapping Hero */}
        <section className="relative z-20 bg-background rounded-t-[2.5rem] md:rounded-t-[5rem] -mt-20 border-t border-primary/10 shadow-[0_-10px_50px_-20px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
            <p className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-8">
              Trusted by leading companies and institutions
            </p>
            <div className="w-full">
              <LogoCloud />
            </div>
          </div>

          <PopularTutors />
        </section>
      </main>
    </>
  );
}
