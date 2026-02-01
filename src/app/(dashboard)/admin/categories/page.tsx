/**
 * COMPONENTS
 */
import { CategoryTable } from "@/components/features/dashboard/categories/category-table";
import { Separator } from "@/components/ui/separator";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Categories</h3>
        <p className="text-sm text-muted-foreground">
          Manage your platform categories, including creating, updating, and
          deleting them.
        </p>
      </div>
      <Separator />
      <CategoryTable />
    </div>
  );
}
