"use server";

import { cookies } from "next/headers";

export async function createCheckoutSession(rentalRequestId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ rentalRequestId }),
      },
    );

    const responseData = await res.json();

    const checkoutUrl =
      responseData?.data?.paymentUrl?.transactionResult?.checkoutUrl ?? null;
    if (!checkoutUrl) {
      return {
        success: false,
        message: responseData?.message ?? "Failed to create checkout session",
      };
    }

    return { success: true, checkoutUrl };
  } catch (error) {
    console.error("Payment creation failed:", error);
    return { success: false, message: "Something went wrong" };
  }
}
