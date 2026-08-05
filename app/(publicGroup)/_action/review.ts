"use server";

import { cookies } from "next/headers";

export async function ReviewCreated(
  propertyId: string,
  rentalId: string,
  rating: number,
  comment: string,
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({
          propertyId,
          rentalId,
          rating,
          comment,
        }),
      },
    );

    const result = await response.json();

    return {
      success: response.ok,
      data: result.data || null,
      message:
        result.message ||
        (response.ok
          ? "Review created successfully"
          : "Failed to create review"),
    };
  } catch (error) {
    console.error("Error creating review:", error);
    return {
      success: false,
      data: null,
      message: "An unexpected error occurred while submitting your review.",
    };
  }
}

export const GetReviewByPropertyId = async (propertyId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reviews/property/${propertyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};
