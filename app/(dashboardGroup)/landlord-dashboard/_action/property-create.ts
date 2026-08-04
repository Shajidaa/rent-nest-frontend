"use server";

import { CreatePropertyInput } from "../_schemas/property.schema";
import axios from "axios";
import { cookies } from "next/headers";

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
    // console.log("Creating property:", response);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("Failed to create property:", error);
    console.error("Full backend error response:", error);
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      error: err.response?.data?.message ?? "Failed to create property",
    };
  }
}

export async function fetchSingleProperty(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/${id}`,
      {
        headers: { Cookie: `accessToken=${accessToken}` },
        cache: "no-store",
      },
    );
    const data = await res.json();
    return data;
  } catch {
    return { success: false };
  }
}
