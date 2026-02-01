/**
 * THIS IS BLOCKED PAGE BANNED USER WILL SEE IT
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function BlockedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-6 text-destructive">
        <ShieldAlert size={64} />
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight">
        Account Restricted
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Your account has been blocked by an administrator. If you believe this
        is a mistake, please contact our support team.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link href="/">Return to Home</Link>
        </Button>
        <Button asChild>
          <Link href="mailto:support@skillbridge.com">Contact Support</Link>
        </Button>
      </div>
    </div>
  );
}
