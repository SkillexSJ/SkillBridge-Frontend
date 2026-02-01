import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * PROFILE REDIRECTION EIKHANE HOBE
 */

export default async function ProfileRedirectPage() {
  const user = await requireUser();

  if (user.role === "tutor") {
    redirect("/tutor/profile");
  } else {
    redirect("/dashboard/profile");
  }
}