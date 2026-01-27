import React from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="relative bg-background overflow-hidden pt-20 pb-20 sm:pt-24 lg:pt-36 lg:pb-36">
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-background"></div>
        <div className="absolute top-0 right-0 w-150 h-150 bg-primary/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="mb-16 lg:mb-0 text-left relative">
            <div className="absolute -top-12 -left-8 text-primary/20 hidden lg:block">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6 lg:mb-8">
              A new way to <br />
              <span className="text-primary">learn</span> & get <br />
              knowledge
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 lg:mb-10 max-w-lg leading-relaxed">
              SkillBridge is here for you with various courses & materials from
              skilled tutors all around the world.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-12 lg:mb-16">
              <Button size="lg" className="w-full sm:w-auto">
                Join the Class
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn more
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-10 border-t border-border pt-6 lg:pt-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  15.2K
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Active students
                </p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-border"></div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  4.5K
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Tutors
                </p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-border"></div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-card p-2 rounded-full border border-border">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Resources
                </p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative hidden w-full max-w-lg mx-auto lg:mr-0 lg:max-w-none lg:h-150 lg:block">
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full">
              <div className="absolute top-[15%] -left-4 text-primary animate-pulse z-30">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>

              {/* Top Image (Main) */}
              <div className="absolute top-0 left-[10%] sm:left-[15%] w-[50%] sm:w-[45%] h-[55%] z-20 transition-transform hover:-translate-y-2 duration-500">
                <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden border-4 sm:border-[6px] border-background shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Male student engaging in discussion"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-primary/20 backdrop-blur-xl p-3 sm:p-4 rounded-full border border-primary/30 hidden sm:block">
                  <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>

              {/* Right Image (Man) */}
              <div className="absolute top-[20%] right-0 w-[40%] sm:w-[35%] h-[35%] z-10 transition-transform hover:translate-x-2 duration-500">
                <div className="w-full h-full bg-card rounded-4xl rounded-tr-[5rem] overflow-hidden border-4 sm:border-[6px] border-background shadow-2xl opacity-90 hover:opacity-100">
                  <img
                    src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Portrait of student in profile"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -top-4 right-8 sm:right-12 w-3 h-3 sm:w-4 sm:h-4 bg-muted rounded-full"></div>
              </div>

              {/* Bottom Left Image */}
              <div className="absolute bottom-[5%] left-0 w-[50%] sm:w-[45%] h-[40%] z-30 transition-transform hover:translate-y-2 duration-500">
                <div className="w-full h-full bg-card rounded-[2.5rem] rounded-bl-[1rem] overflow-hidden border-4 sm:border-[6px] border-background shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Group study session in cafe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 sm:-top-5 right-3 sm:right-4 bg-primary/90 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-primary/30">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-primary-foreground"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-primary-foreground/60"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-primary-foreground/30"></div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-[20%] right-[20%] text-muted">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>

              <div className="absolute bottom-[25%] right-[5%] w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-primary/20 flex items-center justify-center -z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-primary/40"></div>
              </div>

              <div className="absolute top-[40%] right-[35%] w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
