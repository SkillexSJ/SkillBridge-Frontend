"use client";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/mobile-nav";

export const navLinks = [
  {
    label: "Features",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
  {
    label: "About",
    href: "#",
  },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-4xl border-primary/30 border-b bg-transparent md:rounded-2xl md:border md:transition-all md:ease-out md:top-2 shadow-[0_0_10px_rgba(0,178,98,0.2),0_0_20px_rgba(0,178,98,0.1)]",
        {
          "border-primary/50 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:max-w-3xl shadow-[0_0_20px_rgba(0,178,98,0.4),0_0_40px_rgba(0,178,98,0.2)]":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <a className="rounded-md p-2 hover:bg-accent" href="#">
          <Logo className="h-4.5" />
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <a
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
              key={i}
            >
              {link.label}
            </a>
          ))}
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
