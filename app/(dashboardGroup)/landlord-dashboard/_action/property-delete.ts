/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function deleteProperty(landId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await axios.delete(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/${landId}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.log(error);

    return (
      error.response?.data || {
        success: false,
        message: "Failed to delete property",
      }
    );
  }
}
