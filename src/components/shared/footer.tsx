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
    <footer className="relative  bg-background text-foreground pt-24 pb-10 overflow-hidden border-t border-border">
      {/* 1. BACKGROUND TYPOGRAPHY (The Brand Base) */}
      <div className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden leading-none z-0 flex justify-center opacity-10 dark:opacity-40">
        {/* Huge cropped text */}
        <h1 className="text-[12vw] md:text-[14vw] font-black text-foreground tracking-tight -mb-8 md:-mb-5 bg-linear-to-b from-primary/60 to-transparent bg-clip-text text-transparent whitespace-nowrap">
          SKILLBRIDGE
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. MAIN GRID LAYOUT */}
        {/* Mobile: 1 col | Tablet: 2 cols | Desktop: 12 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 mb-24">
          {/* COLUMN B: NEWSLETTER (Center on Desktop, Top on Tablet) */}
          {/* Tablet: Full width (col-span-2) | Desktop: Middle 6 cols */}
          <div className="order-1 md:col-span-2 lg:col-span-6 lg:order-2 flex flex-col items-center text-center px-4 md:px-12 lg:px-4">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Subscribe to our <span className="text-primary">newsletter</span>
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md text-lg leading-relaxed">
              Get seasonal learning tips, expert interviews, and exclusive
              discount codes delivered straight to your inbox.
            </p>

            {/* Minimalist Input using shadcn/ui components */}
            <div className="w-full max-w-md relative flex gap-2">
              <Input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
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

          {/* COLUMN A: NAVIGATION (Left) */}
          {/* Tablet: Left side of row 2 | Desktop: Left 3 cols */}
          <div className="order-2 md:col-span-1 lg:col-span-3 lg:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold mb-8 text-foreground uppercase tracking-widest">
              Explore
            </h3>
            <ul className="space-y-5 text-muted-foreground font-medium text-lg">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  About SkillBridge
                </Link>
              </li>
              <li>
                <Link
                  href="/tutors"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block duration-200"
                >
                  Latest Blog
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

          {/* COLUMN C: CONTACT & SOCIALS (Right) */}
          {/* Tablet: Right side of row 2 | Desktop: Right 3 cols */}
          <div className="order-3 md:col-span-1 lg:col-span-3 lg:order-3 flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-sm font-bold mb-8 text-foreground uppercase tracking-widest">
              Contact
            </h3>

            <div className="mb-10 space-y-2 text-muted-foreground font-medium text-lg">
              <a
                href="mailto:hello@skillbridge.com"
                className="block hover:text-primary transition-colors"
              >
                hello@skillbridge.com
              </a>
              <a
                href="tel:+15550000000"
                className="block hover:text-primary transition-colors"
              >
                +1 (555) 000-0000
              </a>
            </div>

            {/* Social Icons */}
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 3. LEGAL & CREDITS ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-sm font-medium text-muted-foreground">
          <div className="mb-4 md:mb-0">
            Made by{" "}
            <span className="text-primary font-bold">SkillBridge Team</span>
          </div>

          <div className="flex gap-8">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
