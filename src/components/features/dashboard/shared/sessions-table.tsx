"use client";

import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Check, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { updateBookingStatus } from "@/service/booking.service";
import { ReviewModal } from "@/components/features/reviews/review-modal";
import { Booking } from "@/types/booking.types";

interface SessionsTableProps {
  bookings: Booking[];
  role: "student" | "tutor";
}

export function SessionsTable({ bookings, role }: SessionsTableProps) {
  const router = useRouter();
  const [localBookings, setLocalBookings] = useState<Booking[]>(bookings);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const handleMarkComplete = async (id: string) => {
    // Optimistic Update
    const previousBookings = [...localBookings];
    setLocalBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "completed" } : b)),
    );
    const toastId = toast.loading("Updating session...");

    try {
      const res = await updateBookingStatus(id, "completed");
      if (res.success) {
        toast.success("Session marked as completed", { id: toastId });
        startTransition(() => {
          router.refresh();
        });
      } else {
        // Revert on failure
        setLocalBookings(previousBookings);
        toast.error(res.message || "Failed to update session", { id: toastId });
      }
    } catch (error) {
      // Revert on error
      setLocalBookings(previousBookings);
      toast.error("An error occurred", { id: toastId });
    }
  };

  // for hydration safety
  const now = new Date();

  // upcoming bookings calculation
  const upcomingBookings = localBookings.filter((b) => {
    if (b.status !== "confirmed") return false;
    const end = new Date(b.endTime);
    const sessionDate = new Date(b.sessionDate);
    const endDateTime = new Date(
      sessionDate.getFullYear(),
      sessionDate.getMonth(),
      sessionDate.getDate(),
      end.getHours(),
      end.getMinutes(),
    );
    return endDateTime > now;
  });

  // past bookings calculation
  const pastBookings = localBookings.filter((b) => {
    if (b.status === "completed" || b.status === "cancelled") return true;
    if (b.status === "confirmed") {
      const end = new Date(b.endTime);
      const sessionDate = new Date(b.sessionDate);
      const endDateTime = new Date(
        sessionDate.getFullYear(),
        sessionDate.getMonth(),
        sessionDate.getDate(),
        end.getHours(),
        end.getMinutes(),
      );
      return endDateTime <= now;
    }
    return false;
  });

  const pendingReviewsCount = pastBookings.filter(
    (b) => b.status === "completed" && !b.review,
  ).length;

  const renderTable = (data: Booking[], type: "upcoming" | "past") => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{role === "student" ? "Tutor" : "Student"}</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-24 text-muted-foreground"
              >
                No {type} sessions found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((booking) => {
              const otherUser =
                role === "student"
                  ? booking.tutorProfile?.user
                  : booking.student;
              const isPastConfirmed =
                type === "past" && booking.status === "confirmed";

              return (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={otherUser?.image} />
                        <AvatarFallback>
                          {otherUser?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{otherUser?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.tutorProfile?.category?.name || "General"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>
                        {format(new Date(booking.sessionDate), "MMM d, yyyy")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(booking.startTime), "p")} -{" "}
                        {format(new Date(booking.endTime), "p")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "completed"
                            ? "secondary"
                            : "destructive" // cancelled
                      }
                      className="capitalize"
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {/* Tutor Actions */}
                    {role === "tutor" &&
                      (booking.status === "confirmed" || isPastConfirmed) && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                          onClick={() => handleMarkComplete(booking.id)}
                        >
                          <Check className="h-3 w-3 mr-1" /> Complete
                        </Button>
                      )}

                    {/* Student Actions */}
                    {role === "student" && booking.status === "completed" && (
                      <div className="flex justify-end">
                        {!booking.review ? (
                          <div className="relative inline-block">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedBookingId(booking.id);
                                setIsReviewModalOpen(true);
                              }}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" /> Review
                            </Button>
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" disabled>
                            <Check className="h-3 w-3 mr-1" /> Reviewed
                          </Button>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );

  if (!mounted) {
    return (
      <Card className="col-span-full">
        <CardHeader>
          <div className="h-7 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded mt-2" />
        </CardHeader>
        <CardContent>
          <div className="h-10 w-full bg-muted animate-pulse rounded mb-4" />
          <div className="h-48 w-full bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>
            Manage your upcoming and past sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="relative overflow-visible">
                Past History
                {role === "student" && pendingReviewsCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {renderTable(upcomingBookings, "upcoming")}
            </TabsContent>
            <TabsContent value="past">
              {renderTable(pastBookings, "past")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedBookingId && (
        <ReviewModal
          bookingId={selectedBookingId}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSuccess={() => router.refresh()}
        />
      )}
    </>
  );
}
