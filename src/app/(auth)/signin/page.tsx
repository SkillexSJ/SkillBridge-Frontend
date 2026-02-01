/**
 * NODE PACKAGES
 */
import { Suspense } from "react";

/**
 * COMPONENTS
 */
import { SignInForm } from "@/components/features/auth/signin/signin-form";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Login to your SkillBridge account
        </p>
      </div>
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}
