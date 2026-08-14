/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export type ActionResponse = {
  success: boolean;
  message?: string;
  accessToken?: string;
};

export const loginAction = async (
  formData: FormData,
): Promise<ActionResponse> => {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

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

    return { success: true, accessToken: data?.accessToken };
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT") throw error;

    console.error("Login failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid email or password",
    };
  }
};

export const registerAction = async (
  formData: FormData,
): Promise<ActionResponse> => {
  const rawData = {
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const cookieStore = await cookies();
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/api/user/register`,
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

    return { success: true, accessToken: data?.accessToken };
  } catch (error: any) {
    if (error?.message === "NEXT_REDIRECT") throw error;

    console.error("Register  failed:", error.response?.data || error.message);
    return {
      success: false,
      message: error.response?.data?.message || "Invalid email or password",
    };
  }
};
