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

export const getBookingColumns = (
  onCancel: (id: string, status: string) => void,
): ColumnDef<Booking>[] => [
  {
    accessorKey: "tutorProfile.user.name",
    header: createSortableHeader("Tutor"),
    cell: ({ row }) => {
      const tutor = row.original.tutorProfile?.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={tutor?.image || ""} alt={tutor?.name} />
            <AvatarFallback>{tutor?.name?.charAt(0) || "T"}</AvatarFallback>
          </Avatar>
          <div className="font-medium text-sm">
            {tutor?.name || "Unknown Tutor"}
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
            : status === "cancelled"
              ? "destructive"
              : "outline";

      return (
        <Badge className="capitalize" variant={variant}>
          {status}
        </Badge>
      );
    },
  },
  createActionsColumn<Booking>([
    {
      label: "Cancel Booking",
      className: "text-destructive focus:text-destructive",
      onClick: (id) => {
        onCancel(id, "pending");
      },
    },
  ]),
];
