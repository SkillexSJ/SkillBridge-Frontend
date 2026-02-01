import { requireUser } from "@/lib/session";
import UnifiedProfile from "@/components/features/dashboard/user/unified-profile";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  const user = await requireUser();

  if (user.role !== "tutor") {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>
      {/* tutor profile */}
      <UnifiedProfile user={user} />
    </div>
  );
}
