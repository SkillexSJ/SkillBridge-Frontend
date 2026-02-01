import { ColumnDef, Column } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/**
 * Creates a standard selection column with a checkbox in the header and each cell.
 */
export function createSelectionColumn<T>(): ColumnDef<T> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

/**
 * Creates a sortable header component for a column.
 */
export function createSortableHeader(label: string) {
  return ({ column }: { column: Column<any, any> }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-4"
    >
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

/**
 * Formats a date value into a readable string.
 */
export function formatDate(date: string | Date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Helper to create a basic date column
 */
export function createDateColumn<T>(accessorKey: keyof T & string, header: string): ColumnDef<T> {
  return {
    accessorKey,
    header,
    cell: ({ getValue }) => {
      const val = getValue() as string;
      return <span className="text-sm text-muted-foreground">{formatDate(val)}</span>;
    },
  };
}

/**
 * Helper for the standard Action dropdown
 */
export interface ActionItem {
  label: string;
  onClick: (id: string) => void;
  className?: string;
  show?: boolean;
}

export function createActionsColumn<T extends { id: string }>(
  items: ActionItem[],
  label = "Actions"
): ColumnDef<T> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const entity = row.original;

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{label}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {items
                .filter((item) => item.show !== false)
                .map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => item.onClick(entity.id)}
                    className={item.className}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  };
}
