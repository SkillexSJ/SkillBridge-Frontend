import { requireUser } from "@/lib/session";
import UnifiedProfile from "@/components/features/dashboard/user/unified-profile";

export default async function StudentProfilePage() {
  const user = await requireUser();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2"></div>
      <UnifiedProfile user={user} />
    </div>
  );
}
