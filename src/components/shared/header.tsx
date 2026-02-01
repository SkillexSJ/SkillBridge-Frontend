"use client";

/**
 * NODE PACKAGES
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
/**
 * HOOKS
 */
import { useScroll } from "@/hooks/use-scroll";
/**
 * COMPONENTS
 */
import { Logo } from "@/components/shared/logo";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileNav } from "@/components/shared/mobile-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

/**
 * LIBS
 */
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import type { Session } from "@/lib/session";

// Nav Links
export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Find Tutors",
    href: "/tutors",
  },
];

interface HeaderProps {
  initialSession?: Session | null;
}

export function Header({ initialSession }: HeaderProps) {
  const scrolled = useScroll(10);
  const { data: sessionData, isPending: isPendingHook } =
    authClient.useSession();
  const router = useRouter();

  //  hydration fix
  const session =
    sessionData === undefined && initialSession !== undefined
      ? initialSession
      : (sessionData ?? initialSession);

  const isPending = isPendingHook && initialSession === undefined;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("Signed out successfully!");
    router.refresh();
  };

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
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <Link
              className={buttonVariants({ variant: "ghost" })}
              href={link.href}
              key={i}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />

          {isPending ? (
            <div className="flex gap-2">
              <div className="hidden md:block h-9 w-24 animate-pulse bg-muted rounded-full" />
              <div className="h-8 w-8 animate-pulse bg-muted rounded-full border border-primary/20" />
            </div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer border border-primary/20 hover:border-primary/50 transition-colors">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {(session.user as any).role !== "tutor" && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/onboarding/tutor"
                      className="cursor-pointer w-full"
                    >
                      Become a Tutor
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full",
                )}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={cn(buttonVariants(), "rounded-full")}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
