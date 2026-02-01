import { ColumnDef } from "@tanstack/react-table";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";

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
import { User } from "@/types/user.types";

export const getUserColumns = (
  onBlock: (id: string) => void,
): ColumnDef<User>[] => [
  createSelectionColumn<User>(),
  {
    accessorKey: "name",
    header: createSortableHeader("User"),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {row.original.image ? (
            <Image
              fill
              src={row.original.image}
              alt={row.original.name}
              className="object-cover"
            />
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              {row.original.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm truncate max-w-[150px]">
            {row.original.name}
          </span>
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {row.original.email}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <div className="flex items-center gap-2">
          {role === "admin" && <ShieldAlert className="h-3 w-3 text-red-500" />}
          {role === "tutor" && (
            <ShieldCheck className="h-3 w-3 text-blue-500" />
          )}
          {role === "student" && <Shield className="h-3 w-3 text-green-500" />}
          <span className="capitalize">{role}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isVerified = row.original.emailVerified;
      const isBlocked = row.original.isBlocked;

      return (
        <div className="flex gap-2">
          {isBlocked ? (
            <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
              Blocked
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="h-5 px-1.5 text-[10px] border-green-200 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
            >
              Active
            </Badge>
          )}
          {row.original.emailVerified && (
            <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
              Verified
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  createActionsColumn<User>([
    {
      label: "Copy User ID",
      onClick: (id) => navigator.clipboard.writeText(id),
    },
    {
      label: "View Details",
      onClick: (id) => console.log("View", id),
    },
    {
      label: "Block User",
      className: "text-destructive",
      show: true,
      onClick: (id) => onBlock(id),
    },
  ]),
];
