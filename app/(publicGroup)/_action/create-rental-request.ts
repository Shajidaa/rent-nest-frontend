"use server";

import { cookies } from "next/headers";

export async function createRentalRequest(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "You are not logged in. Please log in to access this resource.",
    };
  }

  try {
    const payload = {
      propertyId: formData.get("propertyId"),
      tenantId: formData.get("tenantId"),
      status: "PENDING",
      message: formData.get("message") || "No additional message provided.",
      numberOfGuests: Number(formData.get("numberOfGuests")),
    };

    // console.log("Server Action - Payload:", payload);
    // console.log("Server Action - AccessToken exists:", !!accessToken);

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      //   console.error("Server Action - Error response:", data);
      return {
        success: false,
        message:
          data.message || data.error || `Server error: ${response.status}`,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    // console.error("Server Action - Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create rental request",
    };
  }
}
