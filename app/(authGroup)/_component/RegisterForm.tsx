"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2,Eye, EyeOff} from "lucide-react";
import { toast } from "sonner";
import { registerAction } from "../_actions/authActions";
import { useSearchParams } from "next/navigation";

// Register Form Zod Schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 4 characters"),
  role: z.string().min(2, "Role Is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;
export default function RegisterForm() {
      const [serverError, setServerError] = useState<string | null>(null);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isPending, startTransition] = useTransition();
   const searchParams = useSearchParams();
   const redirectTo = searchParams.get("redirectTo") ?? "";
 
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
      startTransition(async () => {
         const formData = new FormData();
         formData.append("name", data.name);
         formData.append("role", data.role);
         formData.append("email", data.email);
         formData.append("password", data.password);
   
         const result = await registerAction(redirectTo, formData);
   
         if ( !result.success) {
           setServerError(result.message || "An unexpected error occurred");
         }
         if (result.success) {
           toast.success(`Register success!`)
         }
   
       });
    
  };
  return (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Server Error Message */}
            {serverError && (
              <div className="p-3 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md">
                {serverError}
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="border-slate-300 focus-visible:ring-emerald-600"
              />
              {errors.name && (
                <p className="text-xs text-rose-500 font-medium">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@rentnest.com"
                {...register("email")}
                className="border-slate-300 focus-visible:ring-emerald-600"
              />
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
              )}
            </div>
            {/* Role Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Role</Label>
              <Input
                id="role"
                type="text"
                placeholder="role"
                {...register("role")}
                className="border-slate-300 focus-visible:ring-emerald-600"
              />
              {errors.role && (
                <p className="text-xs text-rose-500 font-medium">{errors.role.message}</p>
              )}
            </div>

            {/* Password Field */}
           <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="border-slate-300 focus-visible:ring-emerald-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 font-medium">{errors.password.message}</p>
              )}
            </div>

          {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="border-slate-300 focus-visible:ring-emerald-600 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-rose-500 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </CardContent>
  )
}
