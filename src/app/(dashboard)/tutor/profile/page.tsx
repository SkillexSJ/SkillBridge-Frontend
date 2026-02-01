import { requireUser } from "@/lib/session";
import UnifiedProfile from "@/components/features/dashboard/user/unified-profile";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  const user = await requireUser();

  if (user.role !== "tutor") {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1  p-4 pt-6 md:p-8">
      {/* tutor profile */}
      <UnifiedProfile user={user} />
    </div>
  );
}
