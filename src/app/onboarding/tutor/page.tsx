/**
 * NODE PACKAGES
 */
import { redirect } from "next/navigation";

/**
 * COMPONENTS
 */
import MultiStepTutorForm from "@/components/features/auth/onboarding/multi-step-form";
import { GradientBars } from "@/components/Layouts/GradientLayout";
import { getCurrentUser } from "@/lib/session";

export default async function TutorOnboardingPage() {
  const user = await getCurrentUser();

  // redirect to dashboard  already a tutor
  if (user?.role === "tutor") {
    redirect("/dashboard");
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 overflow-y-auto h-full">
        <div className="flex justify-center gap-2 md:justify-start">
          {/* <Logo className="h-10 w-auto" /> */}
        </div>
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-lg mx-2">
            <div className="flex flex-col items-center text-center mb-6">
              <h1 className="text-2xl font-bold">Complete Your Profile</h1>
              <p className="text-sm text-muted-foreground">
                Set up your tutor profile to start teaching.
              </p>
            </div>
            <MultiStepTutorForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-zinc-900">
        <GradientBars
          colors={["rgba(0,0,0,0)", "rgba(0, 178, 98, 0.3)", "rgba(0,0,0,0)"]}
        />

        <div className="absolute bottom-10 left-10 text-white z-10 max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Share Your Knowledge</h2>
          <p className="text-lg text-zinc-200">
            Connect with students globally and help them achieve their learning
            goals.
          </p>
        </div>
      </div>
    </div>
  );
}
