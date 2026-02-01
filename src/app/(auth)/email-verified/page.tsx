"use client";
/**
 * NODE PACKAGES
 */
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * LIBS
 */
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      router.push("/signin");
      return;
    }

    const verify = async () => {
      try {
        const res = await authClient.verifyEmail({
          query: {
            token,
          },
        });
        if (res.error) {
          throw res.error;
        }
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      } catch (error: any) {
        toast.error(error.message || "Failed to verify email");
        router.push("/signin");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex w-full items-center justify-center flex-col gap-4">
      <Loader2 className="animate-spin size-8 text-primary" />
      <p className="text-muted-foreground">Verifying your email...</p>
    </div>
  );
}
