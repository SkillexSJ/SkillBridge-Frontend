/**
 * NODE PACKAGES
 */
import { Mail } from "lucide-react";
import Link from "next/link";

/**
 * COMPONENTS
 */
import { Button } from "@/components/ui/button";

export default async function VerifyEmailPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // checking for tutor
  const searchParams = await props.searchParams;
  const isTutor = searchParams.role === "tutor";

  return (
    <div className="flex  flex-col items-center gap-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Mail className="size-6" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Check your inbox</h1>
        <p className="text-muted-foreground text-sm text-balance">
          We sent a verification link to your email address. Please click the
          link to verify your account.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Button asChild variant="outline" className="w-full">
          <Link href="/signin">Back to Login</Link>
        </Button>
        <Button asChild variant="ghost" className="w-full">
          <Link href={isTutor ? "/onboarding/tutor" : "/"}>
            {isTutor ? "Login to Onboard" : "Back to Home"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
