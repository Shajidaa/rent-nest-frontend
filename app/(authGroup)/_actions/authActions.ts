/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export type ActionResponse = {
  success: boolean;
  message?: string;
};

export const loginAction = async (
  redirectTo: string,
  formData: FormData,
): Promise<ActionResponse> => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  let redirectPath: string | null = null;

  try {
    const cookieStore = await cookies();
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/api/auth/login`,
      rawData,
    );

    const { success, data } = response.data;

    if (success) {
      cookieStore.set({
        name: "accessToken",
        value: data.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 15,
        sameSite: "lax",
      });

      if (data.refreshToken) {
        cookieStore.set({
          name: "refreshToken",
          value: data.refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "lax",
        });
      }
    }

    const decodedToken = jwt.decode(data.accessToken) as JwtPayload;

    if (
      redirectTo &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirectPath = redirectTo;
    } else if (decodedToken?.role === "TENANT") {
      redirectPath = "/tenant-dashboard";
    } else if (decodedToken?.role === "ADMIN") {
      redirectPath = "/admin-dashboard";
    } else if (decodedToken?.role === "LANDLORD") {
      redirectPath = "/landlord-dashboard";
    } else {
      redirectPath = "/";
    }
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT") throw error;

    console.error("Login failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid email or password",
    };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }

  return { success: true };
};
