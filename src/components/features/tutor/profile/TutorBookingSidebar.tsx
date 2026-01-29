import React, { useState } from "react";
import { TutorDetailResponse } from "@/types/tutor.types";
import { Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TutorBookingSidebarProps {
  tutor: TutorDetailResponse;
  availabilitySlots: any[];
}

export const TutorBookingSidebar: React.FC<TutorBookingSidebarProps> = ({
  tutor,
  availabilitySlots,
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

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
                IST (GMT+5:30)
              </button>
            </div>
          </div>

          {/* Date Picker using Shadcn Calendar */}
          <div className="mb-6 flex justify-center bg-black/40 rounded-xl p-2 border border-zinc-800/50">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
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
              Available Slots
            </span>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTimeSlot(time)}
                  className={`py-2.5 px-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    selectedTimeSlot === time
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                      : "bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            disabled={!selectedTimeSlot || !date}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group"
          >
            Schedule Meeting
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
