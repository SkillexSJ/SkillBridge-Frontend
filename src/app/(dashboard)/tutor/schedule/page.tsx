import TutorBookingTable from "@/components/features/dashboard/tutor/bookings/tutor-booking-table";

export default function TutorSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-4">My Schedule</h1>
        {/* <UpcomingSessions /> */}
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight mb-4">
          All Teaching Sessions
        </h2>
        <TutorBookingTable />
      </div>
    </div>
  );
}
