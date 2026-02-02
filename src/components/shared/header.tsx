"use client";

/**
 * NODE PACKAGES
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, User, GraduationCap, LogOut } from "lucide-react";
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
  const session = (
    sessionData === undefined && initialSession !== undefined
      ? initialSession
      : (sessionData ?? initialSession)
  ) as Session | null;

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
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "rounded-full hover:bg-primary/10",
              )}
              href={link.href}
              key={i}
            >
              {link.label}
            </Link>
          ))}
          {/* Become a Tutor CTA - Desktop */}
          {/* Become a Tutor CTA - Desktop */}
          {session?.user.role !== "tutor" && (
            <Link
              href="/onboarding/tutor"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "rounded-full p-2 font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20",
              )}
            >
              Become a Tutor
            </Link>
          )}

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
              <DropdownMenuContent
                align="end"
                className="w-64 p-2 rounded-2xl border-primary/20 bg-background/95 backdrop-blur-md shadow-xl"
              >
                <div className="flex items-center gap-3 p-2 mb-1 rounded-xl bg-muted/50">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || "User"}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary animate-pulse">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5 overflow-hidden">
                    <p className="text-sm font-semibold truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <DropdownMenuSeparator className="my-1 bg-primary/10" />

                <DropdownMenuItem
                  asChild
                  className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer"
                >
                  <Link
                    href="/dashboard"
                    className="w-full flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  asChild
                  className="rounded-lg focus:bg-primary/10 focus:text-primary cursor-pointer"
                >
                  <Link
                    href="/profile"
                    className="w-full flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1 bg-primary/10" />

                <DropdownMenuItem
                  className="rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
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
          {/* Become a Tutor CTA - Mobile */}
          {/* Become a Tutor CTA - Mobile */}
          {session?.user.role !== "tutor" && (
            <Link
              href="/onboarding/tutor"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "rounded-full text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 h-8 px-3",
              )}
            >
              Become a Tutor
            </Link>
          )}
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
