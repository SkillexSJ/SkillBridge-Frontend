"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, Plus, X, Save, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * SERVICES
 */

import {
  getMyTutorProfile,
  updateTutorAvailability,
  AvailabilitySlotInput as AvailabilitySlot,
} from "@/service/tutor.service";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//! Helper time format
const formatTime12Hour = (time24: string) => {
  if (!time24) return "";
  const parts = time24.split(":");
  if (parts.length < 2) return time24;

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (isNaN(hours) || isNaN(minutes)) return time24;

  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export default function AvailabilityEditor() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await getMyTutorProfile();
      if (res.success && res.data.availabilitySlots) {
        const formattedSlots = res.data.availabilitySlots.map((slot: any) => {
          // Helper to extract
          const extractTime = (val: any) => {
            if (typeof val !== "string") return "00:00";
            // Handle ISO string like
            if (val.includes("T")) {
              return val.split("T")[1].substring(0, 5);
            }
            // Handle "14:30:00"
            return val.substring(0, 5);
          };

          return {
            dayOfWeek: slot.dayOfWeek,
            startTime: extractTime(slot.startTime),
            endTime: extractTime(slot.endTime),
          };
        });
        setSlots(formattedSlots);
      }
    } catch (error: any) {
      console.error("Failed to fetch availability", error);
      if (error.status === 404 || error.message?.includes("not found")) {
        setProfileError(true);
      } else {
        toast.error("Failed to load availability");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = (dayIndex: number, start: string, end: string) => {
    if (!start || !end) {
      toast.error("Please select both start and end times");
      return;
    }
    // Basic validation
    if (start >= end) {
      toast.error("End time must be after start time");
      return;
    }

    const newSlot: AvailabilitySlot = {
      dayOfWeek: dayIndex,
      startTime: start,
      endTime: end,
    };
    setSlots([...slots, newSlot]);
  };

  const handleRemoveSlot = (dayIndex: number, slotIndexInDay: number) => {
    const daySlots = slots.filter((s) => s.dayOfWeek === dayIndex);
    const slotToRemove = daySlots[slotIndexInDay];

    // extra work
    const newSlots = [...slots];
    const indexToRemove = newSlots.indexOf(slotToRemove);
    if (indexToRemove > -1) {
      newSlots.splice(indexToRemove, 1);
      setSlots(newSlots);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateTutorAvailability(slots);
      toast.success("Availability updated successfully");
    } catch (error: any) {
      console.error("Failed to save availability", error);
      toast.error(error.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (profileError) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-4">
          <div className="bg-muted p-4 rounded-full">
            <Loader2 className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Tutor Profile Not Found</h3>
          <p className="text-muted-foreground max-w-sm">
            You need to complete your tutor profile details before you can set
            your availability.
          </p>
          <Button asChild>
            <a href="/dashboard/tutor/profile">Go to Profile Settings</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto"
        >
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 divide-y">
          {DAYS.map((dayName, dayIndex) => {
            const daySlots = slots
              .filter((s) => s.dayOfWeek === dayIndex)
              .sort((a, b) => a.startTime.localeCompare(b.startTime));

            return (
              <div
                key={dayIndex}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4"
              >
                <div className="w-32 font-medium text-sm text-foreground/80 flex items-center gap-2">
                  {dayName}
                </div>

                <div className="flex-1 flex flex-wrap items-center gap-2">
                  {daySlots.length === 0 ? (
                    <span className="text-sm text-muted-foreground italic">
                      Unavailable
                    </span>
                  ) : (
                    daySlots.map((slot, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="px-3 py-1 text-sm font-normal gap-2"
                      >
                        <Clock className="h-3 w-3 opacity-50" />
                        {formatTime12Hour(slot.startTime)} -{" "}
                        {formatTime12Hour(slot.endTime)}
                        <button
                          onClick={() => handleRemoveSlot(dayIndex, idx)}
                          className="ml-1 hover:text-destructive focus:outline-none"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove</span>
                        </button>
                      </Badge>
                    ))
                  )}
                </div>

                <div className="flex justify-end">
                  <AddSlotPopover
                    onAdd={(start, end) => handleAddSlot(dayIndex, start, end)}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function AddSlotPopover({
  onAdd,
}: {
  onAdd: (start: string, end: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:00");

  const handleAdd = () => {
    onAdd(start, end);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Add Slot
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Time Slot</h4>
            <p className="text-sm text-muted-foreground">
              Set the start and end time for this slot.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="start">Start</Label>
              <Input
                id="start"
                type="time"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="end">End</Label>
              <Input
                id="end"
                type="time"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button size="sm" onClick={handleAdd}>
            Add Slot
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
