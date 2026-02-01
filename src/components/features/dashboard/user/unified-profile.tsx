"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  Camera,
  MapPin,
  DollarSign,
  Plus,
  X,
  Globe,
  Briefcase,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { User } from "@/lib/session";
import { TutorResponse } from "@/types/tutor.types";
import {
  updateTutorProfile,
  TutorProfileInput,
  getMyTutorProfile,
} from "@/service/tutor.service";
import { uploadProfileImage } from "@/service/user.service";
import { useCachedCategories } from "@/hooks/useCategories";

interface UnifiedProfileProps {
  user: User;
  tutorProfile?: TutorResponse | null;
}

export default function UnifiedProfile({
  user,
  tutorProfile,
}: UnifiedProfileProps) {
  // States
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeProfile, setActiveProfile] = useState<TutorResponse | null>(
    tutorProfile || null,
  );
  const [isLoadingProfile, setIsLoadingProfile] = useState(
    !tutorProfile && user.role === "tutor",
  );

  //  cached categories
  const { categories } = useCachedCategories();

  // Custom states for array fields
  const [expertiseInput, setExpertiseInput] = useState("");
  const [socialLinkInput, setSocialLinkInput] = useState("");

  const defaultValues: Partial<TutorProfileInput> = {
    bio: "",
    specialty: "",
    experience: 0,
    hourlyRate: 0,
    location: "",
    categoryId: "",
    expertise: [],
    socialLinks: [],
  };

  const form = useForm<TutorProfileInput>({
    defaultValues,
  });

  // Fetch Profile if needed
  useEffect(() => {
    if (user.role === "tutor") {
      if (!activeProfile) {
        setIsLoadingProfile(true);
        getMyTutorProfile()
          .then((res) => {
            if (res.success && res.data) {
              setActiveProfile(res.data);
              resetForm(res.data);
            }
          })
          .catch((err) => console.error("Failed to fetch profile", err))
          .finally(() => setIsLoadingProfile(false));
      } else {
        resetForm(activeProfile);
      }
    }
  }, [user.role, activeProfile]);

  const resetForm = (profile: TutorResponse) => {
    form.reset({
      bio: profile.bio || "",
      specialty: profile.specialty || "",
      experience: Number(profile.experience) || 0,
      hourlyRate: profile.hourlyRate ? Number(profile.hourlyRate) : 0,
      location: profile.location || "",
      categoryId: profile.categoryId || "",
      expertise: profile.expertise || [],
      socialLinks: profile.socialLinks || [],
    });
  };

  // image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setIsUploading(true);

    try {
      await uploadProfileImage(file);
      toast.success("Profile image updated");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // submit handler
  const onSubmit = async (data: TutorProfileInput) => {
    setIsSaving(true);
    try {
      await updateTutorProfile({
        ...data,
        experience: Number(data.experience),
        hourlyRate: Number(data.hourlyRate),
      });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  //  handling functions for arrays
  const addExpertise = () => {
    if (!expertiseInput.trim()) return;
    const current = form.getValues("expertise") || [];
    if (!current.includes(expertiseInput.trim())) {
      form.setValue("expertise", [...current, expertiseInput.trim()]);
    }
    setExpertiseInput("");
  };

  // expertise handler
  const removeExpertise = (item: string) => {
    const current = form.getValues("expertise") || [];
    form.setValue(
      "expertise",
      current.filter((i) => i !== item),
    );
  };

  // link handler
  const addSocialLink = () => {
    if (!socialLinkInput.trim()) return;
    const current = form.getValues("socialLinks") || [];
    if (!current.includes(socialLinkInput.trim())) {
      form.setValue("socialLinks", [...current, socialLinkInput.trim()]);
    }
    setSocialLinkInput("");
  };

  // link handler
  const removeSocialLink = (item: string) => {
    const current = form.getValues("socialLinks") || [];
    form.setValue(
      "socialLinks",
      current.filter((i) => i !== item),
    );
  };

  const isTutor = user.role === "tutor";

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  const currentExpertise = form.watch("expertise") || [];
  const currentSocialLinks = form.watch("socialLinks") || [];

  return (
    <div className="space-y-6 w-full max-w-full mx-auto pb-24">
      {/* HEADER / AVATAR SECTION */}
      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-48 relative overflow-hidden flex items-center justify-center border-b border-border/40 bg-muted/10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-black/70 dark:text-white/70">
            SKILL BRIDGE<span className="text-primary">.</span>
          </h1>
        </div>
        <CardContent className="px-6 pb-8 pt-0 flex flex-col items-start sm:flex-row sm:items-end gap-6 -mt-12">
          <div className="relative group">
            <Avatar className="h-32 w-32 rounded-2xl border-4 border-background shadow-xl">
              <AvatarImage
                src={user.image || ""}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl bg-muted font-bold text-muted-foreground">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <Label
                htmlFor="image-upload"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>
          <div className="text-left space-y-1 mb-2 flex-1">
            <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
            <p className="text-muted-foreground font-medium">{user.email}</p>
            <div className="flex flex-wrap gap-2 justify-start pt-2">
              <Badge
                variant="secondary"
                className="capitalize px-3 py-1 text-sm font-medium"
              >
                {user.role}
              </Badge>
              {user.emailVerified && (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 bg-green-50"
                >
                  Verified Account
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TUTOR PROFILE FORM */}
      {isTutor && activeProfile ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              {/* LEFT COLUMN: Main Info */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>Professional Details</CardTitle>
                        <CardDescription>
                          Basic info displayed on your public profile
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="grid gap-6 pt-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Headline</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Senior Math Tutor"
                                className="h-10"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Your professional title.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell students about your teaching style, experience, and what they can expect..."
                              className="min-h-[180px] resize-y leading-relaxed"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>Skills & Expertise</CardTitle>
                        <CardDescription>
                          Add tags to help students find you
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={expertiseInput}
                          onChange={(e) => setExpertiseInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addExpertise();
                            }
                          }}
                          placeholder="Add a skill (e.g. Calculus, Physics) and press Enter"
                          className="h-10"
                        />
                        <Button
                          type="button"
                          onClick={addExpertise}
                          className="h-10 px-4"
                        >
                          <Plus className="h-4 w-4 mr-2" /> Add
                        </Button>
                      </div>

                      <div className="bg-muted/30 rounded-xl p-4 min-h-[80px] border border-dashed border-muted-foreground/20 flex flex-wrap gap-2">
                        {currentExpertise.length === 0 ? (
                          <div className="w-full flex items-center justify-center text-muted-foreground text-sm py-4">
                            No skills added yet. Start typing above!
                          </div>
                        ) : (
                          currentExpertise.map((item, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-3 py-1.5 text-sm font-medium gap-2 bg-background border hover:bg-accent transition-colors"
                            >
                              {item}
                              <X
                                className="h-3.5 w-3.5 cursor-pointer text-muted-foreground hover:text-destructive transition-colors"
                                onClick={() => removeExpertise(item)}
                              />
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT COLUMN: Stats & Social */}
              <div className="space-y-8">
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Key Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-5">
                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate ($)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                type="number"
                                className="pl-10 h-10 text-lg font-medium"
                                placeholder="50"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 5"
                              className="h-10"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                              <Input
                                className="pl-10 h-10"
                                placeholder="City, Country"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Social Links</CardTitle>
                    <CardDescription>External profile URLs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={socialLinkInput}
                        onChange={(e) => setSocialLinkInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSocialLink();
                          }
                        }}
                        placeholder="https://..."
                        className="h-9 text-sm"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addSocialLink}
                        variant="outline"
                        className="h-9 px-3"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {currentSocialLinks.length === 0 && (
                        <p className="text-xs text-muted-foreground italic text-center py-2">
                          No links added.
                        </p>
                      )}
                      {currentSocialLinks.map((link, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2.5 bg-muted/40 border rounded-lg group hover:bg-muted/60 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <div className="p-1.5 bg-background rounded-md border text-muted-foreground">
                              <Globe className="h-3 w-3" />
                            </div>
                            <span className="truncate max-w-[180px] font-medium text-foreground">
                              {link}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeSocialLink(link)}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* ACTION BAR */}
            <div className="sticky bottom-6 z-10 flex justify-center w-full px-4">
              <Card className="w-full max-w-4xl shadow-xl border-primary/20 bg-background/90 backdrop-blur-xl rounded-2xl">
                <CardContent className="p-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Remember to save your changes before leaving.
                  </p>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 sm:flex-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 sm:flex-none min-w-[140px] shadow-md shadow-primary/20"
                    >
                      {isSaving && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      ) : (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your personal account details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={user.name}
                disabled
                readOnly
                className="bg-muted h-10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                disabled
                readOnly
                className="bg-muted h-10"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
