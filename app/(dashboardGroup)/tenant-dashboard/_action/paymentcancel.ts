/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export async function paymentCancel(
  rentalRequestId: string,
  sessionId: string | null,
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/cancel/${rentalRequestId}`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ sessionId }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      // If the backend says no cancellable payment found,
      // you can choose to treat it as a success/noop instead of throwing an error
      if (data.message?.includes("No cancellable payment found")) {
        return {
          success: true,
          message: "Payment already canceled or not found.",
        };
      }
      throw new Error(data.message || "Failed to process cancellation.");
    }

    return data;
  } catch (error: any) {
    console.error("Payment cancellation failed:", error);
    // Throw the error so the client component's catch block catches it
    throw new Error(error.message || "Something went wrong");
  }
}
