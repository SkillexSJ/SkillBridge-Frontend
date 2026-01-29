"use client";

/**
 * NODE PACKAGES
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * COMPONENTS
 */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

/**
 * UTILS
 */
import { cn } from "@/lib/utils";

/**
 * SERVICES
 */
import {
  createTutorProfile,
  updateTutorAvailability,
  AvailabilitySlot,
} from "@/service/tutor.service";
import { getAllCategories } from "@/service/category.service";

/**
 * TYPES
 */
import { Category } from "@/types/types";

/**
 * CONSTANTS
 */
const steps = [
  { id: "profile", title: "Profile Details" },
  { id: "expertise", title: "Expertise & Rate" },
  { id: "availability", title: "Availability" },
];

const DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

/**
 * ANIMATIONS
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MultiStepTutorForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    bio: "",
    experience: "",
    location: "",
    categoryId: "",
    specialty: "",
    hourlyRate: "",
  });

  const [availability, setAvailability] = useState<AvailabilitySlot[]>([
    { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }, // Default Monday
  ]);


  /**
   * Category Fetching
   */
  useEffect(() => {
    async function fetchCats() {
      try {
        const res = await getAllCategories();
        if (Array.isArray(res.data)) setCategories(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchCats();
  }, []);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSlot = () => {
    setAvailability([
      ...availability,
      { dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
    ]);
  };

  const removeSlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const updateSlot = (
    index: number,
    field: keyof AvailabilitySlot,
    value: any,
  ) => {
    const newSlots = [...availability];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setAvailability(newSlots);
  };

  const nextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    setIsSubmitting(true);
    let profileCreated = false;

    try {
      // 1. Create Profile
      try {
        await createTutorProfile({
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          expertise: [], // Optional
          socialLinks: [], // Optional
        });
        profileCreated = true;
      } catch (error: any) {
        if (error.message?.includes("already exists")) {
          profileCreated = true;
        } else {
          throw error;
        }
      }

      // 2. Update Availability
      if (availability.length > 0) {
        // numbers/strings as expected
        const cleanSlots = availability.map((s) => ({
          dayOfWeek: Number(s.dayOfWeek),
          startTime: s.startTime,
          endTime: s.endTime,
        }));
        await updateTutorAvailability(cleanSlots);
      }

      toast.success("Profile created successfully!");
      // Clear intent cookie
      document.cookie =
        "intended_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/dashboard");
    } catch (error: any) {
      if (profileCreated) {
        toast.warning(
          "Profile created, but availability could not be saved. Please update it in your dashboard.",
        );
        router.push("/dashboard");
      } else {
        toast.error(error.message || "Failed to create profile");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 0: // Profile
        if (formData.bio.length <= 10) {
          toast.error("Bio must be longer than 10 characters");
          return false;
        }
        if (formData.experience.length <= 10) {
          toast.error("Experience details must be longer than 10 characters");
          return false;
        }
        return true;
      case 1: // Expertise
        if (!formData.categoryId) {
          toast.error("Please select a category");
          return false;
        }
        if (!formData.specialty) {
          toast.error("Please enter your specialty");
          return false;
        }
        if (Number(formData.hourlyRate) <= 0 || !formData.hourlyRate) {
          toast.error("Please enter a valid hourly rate");
          return false;
        }
        return true;
      case 2: // Availability
        if (availability.length === 0) {
          toast.error("Please add at least one availability slot");
          return false;
        }
        for (let i = 0; i < availability.length; i++) {
          const slot = availability[i];
          if (!slot.startTime || !slot.endTime) {
            toast.error("Please fill in start and end times for all slots");
            return false;
          }
          if (slot.startTime >= slot.endTime) {
            toast.error(`Slot ${i + 1}: End time must be after start time`);
            return false;
          }
        }
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="w-full py-8">
      {/* Steps Indicator */}
      <div className="flex justify-between mb-8 px-4 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300",
                index <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {index + 1}
            </div>
            <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
              {step.title}
            </span>
          </div>
        ))}
        {/* Progress Bar Background */}
        <div className="absolute top-[44px] left-0 w-full h-0.5 bg-muted z-0 hidden md:block" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>
              Step {currentStep + 1} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, x: -20 }}
                variants={fadeInUp}
                className="space-y-6"
              >
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        placeholder="Tell students about yourself..."
                        className="min-h-[100px]"
                        value={formData.bio}
                        onChange={(e) => updateFormData("bio", e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Min 10 characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Experience</Label>
                      <Textarea
                        placeholder="Your teaching experience..."
                        className="min-h-[100px]"
                        value={formData.experience}
                        onChange={(e) =>
                          updateFormData("experience", e.target.value)
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Min 10 characters
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label>Location (Optional)</Label>
                      <Input
                        placeholder="City, Country"
                        value={formData.location}
                        onChange={(e) =>
                          updateFormData("location", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(val) =>
                          updateFormData("categoryId", val)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Specialty</Label>
                      <Input
                        placeholder="e.g. Algebra, React Native"
                        value={formData.specialty}
                        onChange={(e) =>
                          updateFormData("specialty", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Hourly Rate ($)</Label>
                      <Input
                        type="number"
                        placeholder="25"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                          updateFormData("hourlyRate", e.target.value)
                        }
                      />
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Weekly Availability</Label>
                      <Button size="sm" variant="outline" onClick={addSlot}>
                        <Plus className="w-4 h-4 mr-1" /> Add Slot
                      </Button>
                    </div>

                    {availability.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        No availability slots added.
                      </p>
                    )}

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {availability.map((slot, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 border rounded-lg bg-card/50"
                        >
                          <Select
                            value={slot.dayOfWeek.toString()}
                            onValueChange={(val) =>
                              updateSlot(idx, "dayOfWeek", Number(val))
                            }
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DAYS.map((d) => (
                                <SelectItem
                                  key={d.value}
                                  value={d.value.toString()}
                                >
                                  {d.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input
                            type="time"
                            className="w-[110px]"
                            value={slot.startTime}
                            onChange={(e) =>
                              updateSlot(idx, "startTime", e.target.value)
                            }
                          />
                          <span className="text-muted-foreground">-</span>
                          <Input
                            type="time"
                            className="w-[110px]"
                            value={slot.endTime}
                            onChange={(e) =>
                              updateSlot(idx, "endTime", e.target.value)
                            }
                          />

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSlot(idx)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0 || isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Complete Profile <Check className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={isSubmitting}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
