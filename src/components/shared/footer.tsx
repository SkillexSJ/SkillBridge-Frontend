import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative  pt-20 pb-10 overflow-hidden border-t border-border">
      {/* 1. BACKGROUND TYPOGRAPHY (The Brand Base) */}
      <div className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden z-0 flex justify-center opacity-10 dark:opacity-65 md:dark:opacity-50">
        <h1 className="text-[18vw] md:text-[15vw] font-black text-foreground tracking-tighter leading-none -mb-4 md:-mb-11 whitespace-nowrap bg-linear-to-b from-primary/60 to-transparent bg-clip-text text-transparent">
          SKILLBRIDGE
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. MAIN GRID LAYOUT */}
        {/* Mobile: 2 cols | Tablet: 2 cols | Desktop: 12 cols */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-20">
          {/* COLUMN B: NEWSLETTER (Full width on Mobile) */}
          <div className="col-span-2 lg:col-span-6 order-1 lg:order-2 flex flex-col items-center text-center px-4 lg:px-4">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">
              Subscribe to our <span className="text-primary">newsletter</span>
            </h3>
            {/* Hidden on mobile to save space, visible on tablet+ */}
            <p className="hidden md:block text-muted-foreground mb-6 md:mb-8 max-w-md text-lg leading-relaxed">
              Get seasonal learning tips, expert interviews, and exclusive
              discount codes delivered straight to your inbox.
            </p>

            {/* Minimalist Input */}
            <div className="w-full max-w-md relative flex gap-2 mb-8 md:mb-0">
              <Input
                type="email"
                placeholder="YOUR EMAIL"
                className="bg-background/50 border-input py-6 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary font-bold tracking-wider"
              />
              <Button
                size="icon"
                className="h-auto w-14 aspect-square rounded-md bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* COLUMN A: NAVIGATION (Left col on mobile) */}
          <div className="col-span-1 lg:col-span-3 order-2 lg:order-1 flex flex-col items-start text-left pl-4 md:pl-0 md:items-start">
            <h3 className="text-sm font-bold mb-6 text-foreground uppercase tracking-widest">
              Explore
            </h3>
            <ul className="space-y-4 text-muted-foreground font-medium text-base md:text-lg">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN C: CONTACT & SOCIALS (Right col on mobile) */}
          <div className="col-span-1 lg:col-span-3 order-3 lg:order-3 flex flex-col items-end text-right pr-4 md:pr-0 md:items-end">
            <h3 className="text-sm font-bold mb-6 text-foreground uppercase tracking-widest">
              Contact
            </h3>

            <div className="mb-8 space-y-2 text-muted-foreground font-medium text-base md:text-lg">
              <a
                href="mailto:hello@skillbridge.com"
                className="block hover:text-primary transition-colors"
              >
                Email Us
              </a>
              <a
                href="tel:+15550000000"
                className="block hover:text-primary transition-colors"
              >
                Call Us
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2 md:gap-4 flex-wrap justify-end">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 3. LEGAL & CREDITS ROW */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-xs md:text-sm font-medium text-muted-foreground">
          <div className="mb-4 md:mb-0">
            © 2026 <span className="text-primary font-bold">SkillBridge</span>
          </div>

          <div className="flex gap-4 md:gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
