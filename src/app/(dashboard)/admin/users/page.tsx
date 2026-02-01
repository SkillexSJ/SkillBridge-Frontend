import { UserTable } from "@/components/features/dashboard/users/user-table";
import { Separator } from "@/components/ui/separator";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage users, view their details, and control access.
        </p>
      </div>
      <Separator />
      <UserTable />
    </div>
  );
}
