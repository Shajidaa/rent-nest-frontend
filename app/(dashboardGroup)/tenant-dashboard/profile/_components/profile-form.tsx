/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UpdateProfile } from "../../_action/profile";
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 4 characters.").optional(),
  profilePhoto:z.string().optional(),
  phoneNumber: z.string().optional(),
  bio: z.string().max(250, "Bio cannot exceed 250 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProfileForm({ initialData, onSuccess, onCancel }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      profilePhoto: initialData.profilePhoto || "",
      phoneNumber: initialData.profile?.phoneNumber || "",
      bio: initialData.profile?.bio || "",
    },
  });

async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    try {
      // console.log("Submitting values:", values);
      
      const res = await UpdateProfile(initialData.id,values);
      
      if (!res.success) {
        toast.error(res.message || "Failed to update profile.");
        return;
      }

      toast.success("Profile updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Name</label>
        <Input placeholder="Your full name" {...register("name")} />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>
 <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Profile Photo</label>
        <Input placeholder="Profile Photo link" {...register("profilePhoto")} />
        {errors.profilePhoto && (
          <p className="text-sm text-destructive">{errors.profilePhoto.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Phone Number</label>
        <Input placeholder="+1 (555) 000-0000" {...register("phoneNumber")} />
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Bio</label>
        <Textarea 
          placeholder="Tell us a little bit about yourself" 
          className="resize-none" 
          {...register("bio")} 
        />
        {errors.bio && (
          <p className="text-sm text-destructive">{errors.bio.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}