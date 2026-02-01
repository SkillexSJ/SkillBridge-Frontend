import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  createActionsColumn,
  createSelectionColumn,
  createSortableHeader,
} from "../shared/table-helpers";
import { Booking } from "@/types/booking.types";

export const getBookingColumns = (
  onView: (id: string) => void,
): ColumnDef<Booking>[] => [
  createSelectionColumn<Booking>(),
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.original.id.slice(0, 8)}...
      </span>
    ),
  },
  {
    accessorKey: "student",
    header: createSortableHeader("Student"),
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {student?.name || "Unknown"}
          </span>
          <span className="text-xs text-muted-foreground">
            {student?.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tutor",
    header: createSortableHeader("Tutor"),
    cell: ({ row }) => {
      const tutorUser = row.original.tutorProfile?.user;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {tutorUser?.name || "Unknown"}
          </span>
          <span className="text-xs text-muted-foreground">
            {tutorUser?.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "sessionDate",
    header: createSortableHeader("Date"),
    cell: ({ row }) => (
      <span className="text-sm">
        {new Date(row.original.sessionDate).toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "outline";

      switch (status) {
        case "confirmed":
          variant = "default";
          break;
        case "completed":
          variant = "secondary";
          break;
        case "cancelled":
          variant = "destructive";
          break;
        case "pending":
          variant = "outline";
          break;
      }

      return (
        <Badge variant={variant} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Price",
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        ${Number(row.original.totalPrice).toFixed(2)}
      </span>
    ),
  },
  createActionsColumn<Booking>([
    {
      label: "View Details",
      onClick: (id) => onView(id),
    },
  ]),
];
