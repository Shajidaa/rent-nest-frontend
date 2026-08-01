"use server";

import { CreatePropertyInput } from "../_schemas/property.schema";
import axios from "axios";
import { cookies } from "next/headers";

export async function updateProperty(data: CreatePropertyInput, id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await axios.patch(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );
    console.log("Updating property:", response);
    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("Failed to update property:", error);
    console.error("Full backend error response:", error);
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      error: err.response?.data?.message ?? "Failed to update property",
    };
  }
}
