"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray, Controller } from "react-hook-form"; // NEW
import { zodResolver } from "@hookform/resolvers/zod"; // NEW
import * as z from "zod"; // NEW
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import { cn } from "@/lib/utils";
import {
  createTutorProfile,
  updateTutorAvailability,
} from "@/service/tutor.service";
import { getAllCategories } from "@/service/category.service";
import { Category } from "@/types/category.types";

// --- 1. ZOD SCHEMA (Centralized Validation) ---
const tutorFormSchema = z.object({
  // Step 1: Profile
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  location: z.string().optional(),

  // Step 2: Expertise
  categoryId: z.string().min(1, "Please select a category"),
  hourlyRate: z.coerce.number().min(1, "Rate must be at least $1"),
  expertise: z.array(z.string()).min(1, "Add at least one skill"),

  // Step 3: Availability
  availability: z
    .array(
      z.object({
        dayOfWeek: z.coerce.number(),
        startTime: z.string().min(1, "Required"),
        endTime: z.string().min(1, "Required"),
      }),
    )
    .min(1, "Please add at least one availability slot")
    .refine((slots) => slots.every((slot) => slot.endTime > slot.startTime), {
      message: "End time must be after start time",
    }),
});

type TutorFormValues = z.infer<typeof tutorFormSchema>;

type Step = {
  id: string;
  title: string;
  fields: (keyof TutorFormValues)[];
};

const steps: Step[] = [
  {
    id: "profile",
    title: "Profile Details",
    fields: ["bio", "experience", "location"],
  },
  {
    id: "expertise",
    title: "Expertise & Rate",
    fields: ["categoryId", "hourlyRate", "expertise"],
  },
  { id: "availability", title: "Availability", fields: ["availability"] },
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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MultiStepTutorForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagInput, setTagInput] = useState("");

  // --- 2. REACT HOOK FORM SETUP ---
  const form = useForm({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      bio: "",
      experience: 0,
      location: "",
      categoryId: "",
      hourlyRate: 25,
      expertise: [],
      availability: [{ dayOfWeek: 1, startTime: "09:00", endTime: "17:00" }],
    },
    mode: "onChange",
  });

  const {
    register,
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  // Handles the array of availability slots
  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  const currentExpertise = watch("expertise");

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

  // --- 3. TAG HANDLING ---
  const addTag = () => {
    const tag = tagInput.trim().replace(",", "");
    if (tag && !currentExpertise.includes(tag)) {
      setValue("expertise", [...currentExpertise, tag], {
        shouldValidate: true,
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "expertise",
      currentExpertise.filter((t) => t !== tagToRemove),
      { shouldValidate: true },
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  // --- 4. NAVIGATION LOGIC ---
  const nextStep = async () => {
    const fields = steps[currentStep].fields as any[];
    // Trigger validation ONLY for fields in the current step
    const isStepValid = await trigger(fields, { shouldFocus: true });
    if (isStepValid) {
      if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // handle submit
  const onSubmit = async (data: TutorFormValues) => {
    try {
      // Create Profile with availability
      await createTutorProfile({
        bio: data.bio,
        experience: data.experience,
        location: data.location,
        categoryId: data.categoryId,
        hourlyRate: data.hourlyRate,
        expertise: data.expertise,
        specialty: data.expertise.join(", "),
        socialLinks: [],
        availability: data.availability,
      });

      toast.success("Profile created successfully!");
      document.cookie = "intended_role=; path=/; max-age=0";
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Failed to create profile");
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
        <div className="absolute top-[15px] left-0 w-full h-0.5 bg-muted z-0 hidden md:block" />
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
                {/* STEP 0: PROFILE */}
                {currentStep === 0 && (
                  <>
                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <Textarea
                        {...register("bio")}
                        placeholder="Tell students about yourself..."
                        className="min-h-[100px]"
                      />
                      {errors.bio && (
                        <p className="text-sm text-destructive">
                          {errors.bio.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (Years)</Label>
                      <Input
                        type="number"
                        {...register("experience")}
                        placeholder="e.g. 5"
                      />
                      {errors.experience && (
                        <p className="text-sm text-destructive">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Location (Optional)</Label>
                      <Input
                        {...register("location")}
                        placeholder="City, Country"
                      />
                    </div>
                  </>
                )}

                {/* STEP 1: EXPERTISE */}
                {currentStep === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
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
                        )}
                      />
                      {errors.categoryId && (
                        <p className="text-sm text-destructive">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Expertise ({currentExpertise.length})</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {currentExpertise.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type skill (e.g. Figma)"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          onClick={addTag}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {errors.expertise && (
                        <p className="text-sm text-destructive">
                          {errors.expertise.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Hourly Rate ($)</Label>
                      <Input
                        type="number"
                        {...register("hourlyRate")}
                        placeholder="25"
                      />
                      {errors.hourlyRate && (
                        <p className="text-sm text-destructive">
                          {errors.hourlyRate.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* STEP 2: AVAILABILITY */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Weekly Availability</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        type="button"
                        onClick={() =>
                          append({
                            dayOfWeek: 1,
                            startTime: "09:00",
                            endTime: "17:00",
                          })
                        }
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Slot
                      </Button>
                    </div>

                    {errors.availability && (
                      <p className="text-sm text-destructive">
                        {errors.availability.message ||
                          errors.availability.root?.message}
                      </p>
                    )}

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-2 p-3 border rounded-lg bg-card/50"
                        >
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Controller
                              control={control}
                              name={`availability.${index}.dayOfWeek`}
                              render={({ field }) => (
                                <Select
                                  onValueChange={(val) =>
                                    field.onChange(Number(val))
                                  }
                                  value={String(field.value)}
                                >
                                  <SelectTrigger className="flex-1 sm:w-[130px]">
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
                              )}
                            />

                            {/* Mobile Delete */}
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              onClick={() => remove(index)}
                              className="sm:hidden text-destructive shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Input
                              type="time"
                              className="flex-1 sm:w-[120px]"
                              {...register(`availability.${index}.startTime`)}
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                              type="time"
                              className="flex-1 sm:w-[120px]"
                              {...register(`availability.${index}.endTime`)}
                            />
                          </div>

                          {/* Desktop Delete */}
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => remove(index)}
                            className="hidden sm:inline-flex text-destructive hover:bg-destructive/10"
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
              <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
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
              // Type button prevents form submission on Enter
              <Button type="button" onClick={nextStep} disabled={isSubmitting}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
