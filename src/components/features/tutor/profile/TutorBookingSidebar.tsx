import React, { useState, useMemo } from "react";
import { TutorDetailResponse } from "@/types/tutor.types";
import { Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { createBooking } from "@/service/booking.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface TutorBookingSidebarProps {
  tutor: TutorDetailResponse;
  availabilitySlots: any[];
}

export const TutorBookingSidebar: React.FC<TutorBookingSidebarProps> = ({
  tutor,
  availabilitySlots,
}) => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Generate available time slots based on selected date and tutor's availability
  const timeSlots = useMemo(() => {
    if (!date || !availabilitySlots.length) return [];

    const dayOfWeek = date.getDay(); // 0-6 (Sun-Sat)
    const availableSlotsForDay = availabilitySlots.filter(
      (slot) => slot.dayOfWeek === dayOfWeek
    );

    if (!availableSlotsForDay.length) return [];

    const slots: string[] = [];

    availableSlotsForDay.forEach((slot: any) => {
      // Parse start and end times (assuming "HH:mm" format or ISO string)
      // The backend stores them as Date objects (1970-01-01T...), so we might get ISO strings
      const start = new Date(slot.startTime);
      const end = new Date(slot.endTime);

      let currentHour = start.getHours();
      const endHour = end.getHours();

      while (currentHour < endHour) {
        const timeString = `${currentHour.toString().padStart(2, "0")}:00`;
        slots.push(timeString);
        currentHour++;
      }
    });

    // Sort slots just in case
    return slots.sort();
  }, [date, availabilitySlots]);

  const handleBooking = async () => {
    if (!date || !selectedTimeSlot) return;

    setIsBooking(true);
    try {
      // Calculate endTime (assuming 1 hour sessions for now)
      const [hours, minutes] = selectedTimeSlot.split(":").map(Number);
      const endTime = `${(hours + 1).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      await createBooking({
        tutorProfileId: tutor.id,
        sessionDate: format(date, "yyyy-MM-dd"),
        startTime: selectedTimeSlot,
        endTime: endTime,
        totalPrice: Number(tutor.hourlyRate),
      });

      toast.success("Booking request sent successfully!");
      router.push("/dashboard/bookings"); // Redirect to bookings page
    } catch (error: any) {
      toast.error(error.message || "Failed to book session");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8">
        <h3 className="text-white font-bold mb-6 text-lg">Mentor Impact</h3>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-zinc-500" />
            <span className="text-zinc-400 font-medium">Mentoring Time</span>
          </div>
          <span className="text-white font-bold text-lg">
            {tutor.totalMentoringMins}+{" "}
            <span className="text-sm text-zinc-500 font-normal">mins</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-zinc-500" />
            <span className="text-zinc-400 font-medium">Sessions</span>
          </div>
          <span className="text-white font-bold text-lg">
            {tutor.totalSessions}
          </span>
        </div>
      </div>

      {/* Booking Engine */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden sticky top-32">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-white font-bold text-2xl">Reserve Spot</h3>
              <p className="text-zinc-500 text-sm mt-1">
                1 hour session @{" "}
                <span className="text-emerald-400 font-bold text-base">
                  ${tutor.hourlyRate}
                </span>
              </p>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
                Timezone
              </span>
              <button className="text-emerald-400 text-xs font-bold hover:underline flex items-center gap-1 justify-end">
                Local Time
              </button>
            </div>
          </div>

          {/* Date Picker using Shadcn Calendar */}
          <div className="mb-6 flex justify-center bg-black/40 rounded-xl p-2 border border-zinc-800/50">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setSelectedTimeSlot(null); // Reset time slot when date changes
              }}
              disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border-none text-zinc-300"
              classNames={{
                head_cell: "text-zinc-500 font-normal",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-zinc-800 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-zinc-800 rounded-md transition-colors",
                ),
                day_selected:
                  "bg-emerald-500 text-black hover:bg-emerald-600 hover:text-black focus:bg-emerald-500 focus:text-black",
                day_today: "bg-zinc-800 text-zinc-100",
                day_outside: "text-zinc-700 opacity-50",
                day_disabled: "text-zinc-700 opacity-50",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Time Slots */}
          <div className="mb-8">
            <span className="text-zinc-300 font-semibold text-sm block mb-3">
              {date ? format(date, "EEEE, MMMM d") : "Select a date"}
            </span>
            
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTimeSlot(time)}
                    className={cn(
                      "py-2.5 px-2 rounded-xl text-sm font-medium border transition-all duration-200",
                      selectedTimeSlot === time
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-zinc-500 text-sm bg-black/20 rounded-xl border border-dashed border-zinc-800">
                No slots available for this day
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleBooking}
            disabled={!selectedTimeSlot || !date || isBooking}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
              </>
            ) : (
              <>
                Schedule Meeting
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-zinc-600 text-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
