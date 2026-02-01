import { BookingTable } from "@/components/features/dashboard/bookings/booking-table";
import { Separator } from "@/components/ui/separator";

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Booking Management</h3>
        <p className="text-sm text-muted-foreground">
          View and manage all bookings.
        </p>
      </div>
      <Separator />
      <BookingTable />
    </div>
  );
}