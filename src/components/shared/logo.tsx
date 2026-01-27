"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-10 w-37.5 animate-pulse bg-muted/20 rounded", className)} />
    );
  }

  const logoSrc = resolvedTheme === "dark" ? "/logo.svg" : "/logoblack.svg";

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src={logoSrc}
        alt="SkillBridge Logo"
        width={150}
        height={150}
        className={cn("h-26 w-auto", className)}
        priority
      />
    </Link>
  );
};
