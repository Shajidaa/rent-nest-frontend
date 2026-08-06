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
          ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error: unknown) {
    console.error("Failed to update property:", error);

    let errorMessage = "Failed to update property";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message ?? error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
