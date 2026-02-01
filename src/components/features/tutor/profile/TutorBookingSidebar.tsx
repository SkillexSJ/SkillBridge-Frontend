/**
 * NODE PACKAGES
 */
import React, { useState, useMemo } from "react";
import { Clock, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { format, parseISO, addMinutes, isBefore, set } from "date-fns";

/**
 * TYPES
 */
import { TutorDetailResponse, AvailabilitySlot } from "@/types/tutor.types";

/**
 * COMPONENTS
 */
import { Calendar } from "@/components/ui/calendar";

/**
 * UTILS
 */
import { cn } from "@/lib/utils";

/**
 * SERVICES
 */
import { createBooking } from "@/service/booking.service";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface TutorBookingSidebarProps {
  tutor: TutorDetailResponse;
  availabilitySlots: AvailabilitySlot[];
}

export const TutorBookingSidebar: React.FC<TutorBookingSidebarProps> = ({
  tutor,
  availabilitySlots,
}) => {
  /**
   * States and Hooks
   */
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Get all days of the week
  const availableDaysOfWeek = useMemo(() => {
    return new Set(availabilitySlots.map((slot) => slot.dayOfWeek));
  }, [availabilitySlots]);

  // Check availability
  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    return availableDaysOfWeek.has(dayOfWeek);
  };

  // Generating available time
  const timeSlots = useMemo(() => {
    if (!date || !availabilitySlots.length) return [];

    const dayOfWeek = date.getDay();
    const availableSlotsForDay = availabilitySlots.filter(
      (slot) => slot.dayOfWeek === dayOfWeek,
    );

    if (!availableSlotsForDay.length) return [];

    const slots: string[] = [];
    const sessionDurationMinutes = 60;

    // slot generation
    availableSlotsForDay.forEach((slot) => {
      const slotStart = parseISO(slot.startTime);
      const slotEnd = parseISO(slot.endTime);

      let currentTime = set(new Date(), {
        hours: slotStart.getHours(),
        minutes: slotStart.getMinutes(),
        seconds: 0,
        milliseconds: 0,
      });

      const endTime = set(new Date(), {
        hours: slotEnd.getHours(),
        minutes: slotEnd.getMinutes(),
        seconds: 0,
        milliseconds: 0,
      });

      // Generating slots until the session
      while (isBefore(currentTime, endTime)) {
        // Checking if a full session fits
        const sessionEnd = addMinutes(currentTime, sessionDurationMinutes);
        if (
          isBefore(sessionEnd, endTime) ||
          sessionEnd.getTime() === endTime.getTime()
        ) {
          slots.push(format(currentTime, "HH:mm"));
        }

        // Increment by 1 hour
        currentTime = addMinutes(currentTime, 60);
      }
    });

    return slots.sort();
  }, [date, availabilitySlots]);

  /**
   * Booking Handler
   */
  const handleBooking = async () => {
    // send unauthenticated user to signin page
    if (!session) {
      toast.error("Please sign in to book a session");
      router.push("/signin");
      return;
    }

    if (!date || !selectedTimeSlot) return;

    setIsBooking(true);
    try {
      // Calculate endTime
      const [hours, minutes] = selectedTimeSlot.split(":").map(Number);
      const startTimeDate = set(date, { hours, minutes });
      const endTimeDate = addMinutes(startTimeDate, 60);
      const endTime = format(endTimeDate, "HH:mm");

      await createBooking({
        tutorProfileId: tutor.id,
        sessionDate: format(date, "yyyy-MM-dd"),
        startTime: selectedTimeSlot,
        endTime: endTime,
        totalPrice: Number(tutor.hourlyRate),
      });

      toast.success("Booking request sent successfully!");
      router.push("/dashboard/bookings"); // Redirect to bookings
    } catch (error: any) {
      toast.error("Failed to book session");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="bg-card border border-border rounded-4xl p-8">
        <h3 className="text-foreground font-bold mb-6 text-lg">
          Mentor Impact
        </h3>
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground font-medium">
              Mentoring Time
            </span>
          </div>
          <span className="text-foreground font-bold text-lg">
            {tutor.totalMentoringMins}+{" "}
            <span className="text-sm text-muted-foreground font-normal">
              mins
            </span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground font-medium">Sessions</span>
          </div>
          <span className="text-foreground font-bold text-lg">
            {tutor.totalSessions}
          </span>
        </div>
      </div>

      {/* Booking Engine */}
      <div className="bg-card border border-border rounded-4xl p-6 shadow-2xl relative overflow-hidden sticky top-32">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h3 className="text-foreground font-bold text-2xl">
                Reserve Spot
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                1 hour session @{" "}
                <span className="text-primary font-bold text-base">
                  ${tutor.hourlyRate}
                </span>
              </p>
            </div>
            <div className="text-right">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">
                Timezone
              </span>
              <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1 justify-end">
                Local Time
              </button>
            </div>
          </div>

          {/* Date Picker using Shadcn Calendar */}
          <div className="mb-6 flex justify-center bg-accent/20 rounded-xl p-2 border border-border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setSelectedTimeSlot(null); // Reset time slot when date changes
              }}
              disabled={(d) => {
                // Disable past dates
                if (d < new Date(new Date().setHours(0, 0, 0, 0))) return true;
                // Disable dates with no availability
                return !isDateAvailable(d);
              }}
              modifiers={{
                available: (d) => {
                  // Only mark future/today
                  if (d < new Date(new Date().setHours(0, 0, 0, 0)))
                    return false;
                  return isDateAvailable(d);
                },
              }}
              modifiersClassNames={{
                available:
                  "relative bg-primary/10 text-primary font-semibold border border-primary/30 hover:bg-primary/20 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 after:absolute after:inset-0 after:rounded-md after:shadow-[0_0_8px_2px] after:shadow-primary/20 after:pointer-events-none",
              }}
              className="rounded-md border-none text-foreground"
              classNames={{
                head_cell: "text-muted-foreground font-normal",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-md transition-all duration-200",
                ),
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground shadow-lg",
                day_today: "bg-accent text-accent-foreground font-bold",
                day_outside: "text-muted-foreground opacity-30",
                day_disabled:
                  "text-muted-foreground opacity-30 cursor-not-allowed line-through",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Calendar Legend */}
          <div className="mb-6 flex flex-wrap gap-3 justify-center text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/10 border border-primary/30 shadow-sm shadow-primary/20"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-muted opacity-30 line-through"></div>
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>

          {/* Time Slots */}
          <div className="mb-8">
            <span className="text-foreground font-semibold text-sm block mb-3">
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
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground text-sm bg-accent/10 rounded-xl border border-dashed border-border">
                No slots available for this day
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={handleBooking}
            disabled={isBooking || (!!session && (!selectedTimeSlot || !date))}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Processing...
              </>
            ) : !session ? (
              <>
                Sign in to Book
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Schedule Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground text-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
