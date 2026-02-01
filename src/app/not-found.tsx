import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <HelpCircle className="h-12 w-12 text-primary" />
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold shadow-lg">
          ?
        </div>
      </div>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-[500px] text-muted-foreground">
        Sorry, we couldn't find the page you're looking for. It might have been
        removed, renamed, or doesn't exist.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="default" size="lg">
          <Link href="/">
            <MoveLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
