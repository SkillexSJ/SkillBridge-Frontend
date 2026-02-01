"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  createActionsColumn,
  createSortableHeader,
} from "@/components/features/dashboard/shared/table-helpers";
import { Booking } from "@/types/booking.types";

export const getTutorBookingColumns = (
  onAction: (id: string, action: "confirm" | "cancel" | "complete") => void,
): ColumnDef<Booking>[] => [
  {
    accessorKey: "student.name",
    header: createSortableHeader("Student"),
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={student?.image || ""} alt={student?.name} />
            <AvatarFallback>{student?.name?.charAt(0) || "S"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {student?.name || "Unknown Student"}
            </span>
            <span className="text-xs text-muted-foreground">
              {student?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tutorProfile.category.name",
    header: createSortableHeader("Subject"),
    cell: ({ row }) => {
      return (
        <Badge variant="outline">
          {row.original.tutorProfile?.category?.name || "General"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sessionDate",
    header: createSortableHeader("Date"),
    cell: ({ row }) => {
      const date = new Date(row.getValue("sessionDate"));
      return (
        <div className="text-sm text-muted-foreground">
          {format(date, "PPP")}
        </div>
      );
    },
  },
  {
    accessorKey: "startTime",
    header: "Time",
    cell: ({ row }) => {
      const start = new Date(row.original.startTime);
      const end = new Date(row.original.endTime);
      return (
        <div className="text-sm text-muted-foreground">
          {format(start, "p")} - {format(end, "p")}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: createSortableHeader("Price"),
    cell: ({ row }) => {
      const amount = Number(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium text-sm">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant =
        status === "confirmed"
          ? "default"
          : status === "pending"
            ? "secondary"
            : status === "completed"
              ? "outline"
              : status === "cancelled"
                ? "destructive"
                : "outline";

      const className =
        status === "completed"
          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 hover:bg-green-100"
          : "";

      return (
        <Badge className={`capitalize ${className}`} variant={variant as any}>
          {status}
        </Badge>
      );
    },
  },
  // actions column
  createActionsColumn<Booking>([
    {
      label: "Confirm Booking",
      onClick: (id) => onAction(id, "confirm"),
      className: "text-primary focus:text-primary font-medium",
    },
    {
      label: "Mark Completed",
      onClick: (id) => onAction(id, "complete"),
    },
    {
      label: "Cancel Booking",
      onClick: (id) => onAction(id, "cancel"),
      className: "text-destructive focus:text-destructive",
    },
  ]),
];
