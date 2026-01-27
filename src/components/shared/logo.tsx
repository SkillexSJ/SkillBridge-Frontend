import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/logo.svg"
        alt="SkillBridge Logo"
        width={150} // Set a larger base width
        height={150} // Set a larger base height
        // This class ensures height is fixed, width adjusts automatically
        className={cn("h-25 w-auto ", className)}
      />
    </Link>
  );
};
