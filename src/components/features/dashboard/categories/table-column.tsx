/**
 * NODE PACKAGES
 */
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

/**
 * COMPONENTS
 */
import { Badge } from "@/components/ui/badge";
import {
  createActionsColumn,
  createSelectionColumn,
  createSortableHeader,
  formatDate,
} from "../shared/table-helpers";

/**
 * TYPES
 */
import { Category } from "@/types/types";

export const getCategoryColumns = (
  onDelete: (id: string) => void,
): ColumnDef<Category>[] => [
  // Selection Column
  createSelectionColumn<Category>(),
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.original.id.slice(0, 8)}...
      </span>
    ),
  },
  // Name Column
  {
    accessorKey: "name",
    header: createSortableHeader("Name"),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-muted border border-border">
          {row.original.imageUrl ? (
            <Image
              fill
              src={row.original.imageUrl}
              alt={row.original.name}
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              {row.original.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="font-medium text-sm">{row.original.name}</div>
      </div>
    ),
  },
  // {
  //   accessorKey: "topics",
  //   header: "Topics",
  //   cell: ({ row }) => (
  //     <div className="flex flex-wrap gap-1 max-w-[200px]">
  //       {row.original.topics?.slice(0, 2).map((topic) => (
  //         <Badge
  //           key={topic}
  //           variant="secondary"
  //           className="text-[10px] px-1.5 h-5"
  //         >
  //           {topic}
  //         </Badge>
  //       ))}
  //       {row.original.topics && row.original.topics.length > 2 && (
  //         <Badge variant="outline" className="text-[10px] px-1.5 h-5">
  //           +{row.original.topics.length - 2}
  //         </Badge>
  //       )}
  //     </div>
  //   ),
  // },
  // Created At Column
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  // Actions Column
  createActionsColumn<Category>([
    // {
    //   label: "Edit",
    //   onClick: (id) => {
    //     window.location.href = `/admin/categories/${id}/edit`;
    //   },
    // },
    {
      label: "Delete",
      className: "text-destructive focus:text-destructive",
      onClick: (id) => onDelete(id),
    },
  ]),
];
