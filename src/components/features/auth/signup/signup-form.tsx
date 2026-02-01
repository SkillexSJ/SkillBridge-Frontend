"use client";
/**
 * NODE PACKAGES
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  GraduationCap,
  School,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * COMPONENTS
 */
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * UTILS
 */
import { cn } from "@/lib/utils";

/**
 * SERVICES
 */
import { authService } from "@/service/auth.service";
import Image from "next/image";
import Link from "next/link";

/**
 * Constants
 */
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Schema
const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["student", "tutor"]),
    image: z
      .any()
      .refine(
        (files) =>
          !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE,
        "File size must be less than 5MB",
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ACCEPTED_IMAGE_TYPES.includes(files[0].type),
        "Only JPEG, PNG, and WEBP images are allowed",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

// variants
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1>(0);
  const [direction, setDirection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "student",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = form;

  const role = watch("role");

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setStep((prev) => (prev + newDirection) as 0 | 1);
  };

  const handleRoleSelect = (selectedRole: "student" | "tutor") => {
    setValue("role", selectedRole);
    // delay
    paginate(1);
  };

  const handleGoogleSignIn = async () => {
    try {
      await authService.googleSignIn();
    } catch (error: any) {
      toast.error("Google sign in failed");
    }
  };

  const onSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    try {
      let response;
      const intendedRole = data.role;

      //extra trick for tutor
      const roleToSubmit = intendedRole === "tutor" ? "student" : intendedRole;

      if (intendedRole === "tutor") {
        document.cookie = "intended_role=tutor; path=/; max-age=86400"; // 1 day
      }

      if (data.image && data.image[0]) {
        //  Single Request (Custom Endpoint)
        response = await authService.signUpWithImage({
          email: data.email,
          password: data.password,
          name: data.name,
          role: roleToSubmit,
          imageFile: data.image[0],
        });
      } else {
        //  Standard Request (Better Auth)
        response = await authService.signUp({
          email: data.email,
          password: data.password,
          name: data.name,
          role: roleToSubmit,
        });
      }

      if (response?.error) {
        toast.error(response.error.message || "Failed to create account");
      }

      toast.success("Account created! Please verify your email.");
      router.push(`/verify-email?role=${data.role}`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold">
          {step === 0 ? "Choose your path" : "Create your account"}
        </h1>
        <p className="text-balance text-muted-foreground">
          {step === 0
            ? "Select how you want to use SkillBridge"
            : "Enter your details to get started"}
        </p>
      </div>

      <div className="grid gap-6">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          {step === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ opacity: { duration: 0.2 } }}
              className="grid gap-4"
            >
              <RoleCard
                icon={<GraduationCap className="h-8 w-8" />}
                title="I'm a Student"
                description="I want to find mentors, book sessions, and learn new skills."
                isActive={role === "student"}
                onClick={() => handleRoleSelect("student")}
                colorClass="text-blue-500 bg-blue-50 dark:bg-blue-950/20"
                borderColorClass="group-hover:border-blue-500/50"
              />

              <RoleCard
                icon={<School className="h-8 w-8" />}
                title="I'm a Tutor"
                description="I want to share my expertise, mentor students, and earn income."
                isActive={role === "tutor"}
                onClick={() => handleRoleSelect("tutor")}
                colorClass="text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                borderColorClass="group-hover:border-emerald-500/50"
              />

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or join with
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center h-12 bg-transparent rounded-md  cursor-pointer"
              >
                <Image
                  src="/google-wordmark.svg"
                  alt="Google"
                  width={70}
                  height={24}
                />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ opacity: { duration: 0.2 } }}
              className="grid gap-6"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload Input */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="image">Profile Picture (Optional)</Label>
                  <Input id="image" type="file" {...register("image")} />
                  {errors.image && (
                    <p className="text-xs text-destructive font-medium flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.image.message as string}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="e.g. Alex Johnson"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive font-medium flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive font-medium flex items-center gap-1">
                      <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? "Hide password"
                            : "Show password"}
                        </span>
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center text-sm">
          {step === 1 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => paginate(-1)}
              disabled={isLoading}
              className="mb-2 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Change Role
            </Button>
          )}
          <div className="text-balance text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ... RoleCard ...
function RoleCard({
  icon,
  title,
  description,
  isActive,
  onClick,
  colorClass,
  borderColorClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
  colorClass: string;
  borderColorClass: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 group overflow-hidden",
        "hover:bg-accent/50",
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border hover:border-muted-foreground/20",
        borderColorClass,
      )}
    >
      <div
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
          colorClass,
        )}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg leading-none mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-snug">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 transition-all duration-300",
          "group-hover:opacity-100 group-hover:translate-x-0",
        )}
      >
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
}
