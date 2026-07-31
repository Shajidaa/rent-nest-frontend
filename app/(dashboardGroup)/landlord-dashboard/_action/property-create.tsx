"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { CreatePropertyInput } from "@/lib/type";

export async function createProperty(data: CreatePropertyInput) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("Failed to create property:", error);
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      error: err.response?.data?.message ?? "Failed to create property",
    };
  }
}


