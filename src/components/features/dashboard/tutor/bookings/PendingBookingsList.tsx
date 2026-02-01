"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

/**
 * SERVICES
 */
import { updateBookingStatus } from "@/service/booking.service";

/**
 * TYPES
 */
import { Booking } from "@/types/booking.types";

interface PendingBookingsListProps {
  initialBookings: Booking[];
  onUpdate?: () => void;
}

export function PendingBookingsList({
  initialBookings,
  onUpdate,
}: PendingBookingsListProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleAction = async (
    id: string,
    action: "confirmed" | "cancelled",
  ) => {
    try {
      const response = await updateBookingStatus(id, action);
      if (response.success) {
        toast.success(
          `Booking ${action === "confirmed" ? "accepted" : "declined"}`,
        );
        setBookings((prev) => prev.filter((b) => b.id !== id));
        if (onUpdate) {
          onUpdate();
        }
      } else {
        toast.error(response.message || `Failed to ${action} booking`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`An error occurred`);
    }
  };

  if (bookings.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            Pending Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No pending requests at the moment.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-card border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">
          Pending Requests
        </CardTitle>
        <Badge variant="destructive" className="rounded-full px-2 text-xs">
          {bookings.length}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col p-4 rounded-xl border border-border bg-muted/30"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={booking.student?.image} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {booking.student?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-sm truncate">
                  {booking.student?.name}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {booking.tutorProfile?.category?.name || "Session"} •{" "}
                  {format(new Date(booking.startTime), "h:mm a")}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-primary hover:bg-primary/80 text-white font-medium h-9"
                onClick={() => handleAction(booking.id, "confirmed")}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-muted-foreground/20 hover:bg-muted font-medium h-9"
                onClick={() => handleAction(booking.id, "cancelled")}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
