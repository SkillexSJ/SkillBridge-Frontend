import { Search, Calendar, Video, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-radial-[at_50%_50%] from-primary/5 via-transparent to-transparent opacity-50" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="px-4 py-1 border-primary/30 bg-primary/5 text-primary text-sm rounded-full backdrop-blur-sm"
            >
              How It Works
            </Badge>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6">
            Your Journey in <span className="text-primary">4 Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl text-balance max-w-2xl mx-auto">
            From search to success, we've streamlined the entire process so you
            can focus on what matters most—learning.
          </p>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
            {/* demo data */}
            <div className="grid grid-cols-4 gap-8">
              {[
                {
                  icon: Search,
                  title: "Browse & Discover",
                  desc: "Explore expert tutors across 50+ subjects. Filter by price, rating, and expertise.",
                },
                {
                  icon: Calendar,
                  title: "Book Your Session",
                  desc: "Check availability and book instant sessions at a time that works for you.",
                },
                {
                  icon: Video,
                  title: "Learn & Connect",
                  desc: "Join high-quality video calls with interactive tools purely designed for learning.",
                },
                {
                  icon: Star,
                  title: "Grow & Succeed",
                  desc: "Track your progress, leave feedback, and achieve your personal goals.",
                },
              ].map((step, index) => (
                <div key={index} className="relative group">
                  <div className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-background shadow-[0_4px_20px_-10px] shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50 group-hover:shadow-primary/30">
                    <step.icon className="size-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                    {/* Badge for Step Number */}
                    <div className="absolute -top-3 -right-3 size-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-sm ring-4 ring-background">
                      {index + 1}
                    </div>
                  </div>
                  <div className="mt-8 text-center px-2">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* demo data */}
        {/* MOBILE VIEW */}
        <div className="md:hidden">
          <div className="relative space-y-8">
            {/* Vertical Line */}
            <div className="absolute top-4 bottom-4 left-[1.65rem] w-0.5 bg-linear-to-b from-primary/10 via-primary/40 to-primary/10" />

            {[
              {
                icon: Search,
                title: "Browse & Discover",
                desc: "Explore expert tutors across 50+ subjects. Filter by price, rating, and expertise.",
              },
              {
                icon: Calendar,
                title: "Book Your Session",
                desc: "Check availability and book instant sessions at a time that works for you.",
              },
              {
                icon: Video,
                title: "Learn & Connect",
                desc: "Join high-quality video calls with interactive tools purely designed for learning.",
              },
              {
                icon: Star,
                title: "Grow & Succeed",
                desc: "Track your progress, leave feedback, and achieve your personal goals.",
              },
            ].map((step, index) => (
              <div key={index} className="relative flex items-start gap-6">
                <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-background shadow-md shadow-primary/10">
                  <step.icon className="size-6 text-primary" />
                  <div className="absolute -bottom-2 -right-2 size-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold ring-4 ring-background">
                    {index + 1}
                  </div>
                </div>
                <div className="bg-card border border-border/50 p-5 rounded-2xl shadow-sm grow">
                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
