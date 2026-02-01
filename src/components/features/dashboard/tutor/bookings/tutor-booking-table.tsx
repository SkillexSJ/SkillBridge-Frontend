"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * SERVICES
 */
import { getAllBookings, updateBookingStatus } from "@/service/booking.service";

/**
 * TYPES
 */
import { Booking } from "@/types/booking.types";

/**
 * COLUMNS
 */
import { getTutorBookingColumns } from "./tutor-booking-columns";

export default function TutorBookingTable() {
  //States
  const [data, setData] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchBookings = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllBookings({ limit: 100 });
      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.message || "Failed to fetch bookings");
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleAction = async (
    id: string,
    action: "confirm" | "cancel" | "complete",
  ) => {
    const booking = data.find((b) => b.id === id);
    if (!booking) return;

    if (action === "confirm") {
      if (booking.status !== "pending") {
        toast.error("Only pending bookings can be confirmed");
        return;
      }
      try {
        await updateBookingStatus(id, "confirmed");
        toast.success("Booking confirmed");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to confirm booking");
      }
    } else if (action === "cancel") {
      if (booking.status === "cancelled") return; // already cancelled
      try {
        await updateBookingStatus(id, "cancelled");
        toast.success("Booking cancelled");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    } else if (action === "complete") {
      if (booking.status !== "confirmed") {
        toast.error("Only confirmed bookings can be completed");
        return;
      }
      try {
        await updateBookingStatus(id, "completed");
        toast.success("Booking marked as completed");
        fetchBookings();
      } catch (error) {
        toast.error("Failed to complete booking");
      }
    }
  };

  const columns = React.useMemo(
    () => getTutorBookingColumns(handleAction),
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by student..."
            value={
              (table.getColumn("student_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("student_name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="animate-spin inline mr-2" /> Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
