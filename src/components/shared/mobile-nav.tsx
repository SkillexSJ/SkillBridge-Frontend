/**
 * NODE PACKAGES
 */
import { useState } from "react";
import {
  MenuIcon,
  LayoutDashboard,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

/**
 * COMPONENTS
 */
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { navLinks } from "@/components/shared/header";

/**
 * LIBS
 */
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col w-[80vw] sm:w-[350px] overflow-y-auto p-6"
      >
        <SheetHeader className="text-left mb-4">
          <SheetTitle>
            <span className="font-bold text-lg tracking-wider text-muted-foreground uppercase">
              Navigate
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "justify-start text-base font-medium h-12 w-full",
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-1">
          {isPending ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse bg-muted rounded-full" />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="h-4 w-24 animate-pulse bg-muted rounded" />
                  <div className="h-3 w-32 animate-pulse bg-muted rounded" />
                </div>
              </div>
              <div className="h-10 w-full animate-pulse bg-muted rounded-md" />
            </div>
          ) : session ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 py-2 mb-2">
                <Avatar className="h-10 w-10 border border-primary/20">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold truncate text-foreground">
                    {session.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start gap-3 h-12 text-base font-medium",
                )}
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard className="size-5 text-primary" />
                Dashboard
              </Link>

              <Link
                href="/profile"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-full justify-start gap-3 h-12 text-base font-medium pl-2",
                )}
                onClick={() => setOpen(false)}
              >
                <User className="size-5 text-muted-foreground" />
                Profile
              </Link>

              {(session.user as any).role !== "tutor" && (
                <Link
                  href="/onboarding/tutor"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "w-full justify-start gap-3 h-12 text-base font-medium pl-2",
                  )}
                  onClick={() => setOpen(false)}
                >
                  <GraduationCap className="size-5 text-muted-foreground" />
                  Become a Tutor
                </Link>
              )}

              <Separator className="my-2" />

              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={async () => {
                  try {
                    await authClient.signOut();
                    toast.success("Signed out successfully!");
                    setOpen(false);
                    window.location.href = "/";
                  } catch (error) {
                    console.error("Sign out failed", error);
                  }
                }}
              >
                <LogOut className="size-5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-2">
              <Link
                href="/signin"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full h-11 text-base",
                )}
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants(),
                  "w-full h-11 text-base shadow-lg shadow-primary/20",
                )}
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
