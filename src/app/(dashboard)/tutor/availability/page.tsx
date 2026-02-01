import AvailabilityEditor from "@/components/features/dashboard/tutor/availability/availability-editor";

export default function TutorAvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Availability</h1>
        <p className="text-muted-foreground">
          Manage your weekly teaching schedule.
        </p>
      </div>
      <AvailabilityEditor />
    </div>
  );
}
