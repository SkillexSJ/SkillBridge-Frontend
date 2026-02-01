"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CancelBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingDate?: string;
  tutorName?: string;
}

export function CancelBookingDialog({
  isOpen,
  onClose,
  onConfirm,
  bookingDate,
  tutorName,
}: CancelBookingDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel your session with{" "}
            <span className="font-medium text-foreground">
              {tutorName || "this tutor"}
            </span>{" "}
            on{" "}
            <span className="font-medium text-foreground">
              {bookingDate || "this date"}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Booking</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Yes, Cancel It
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
