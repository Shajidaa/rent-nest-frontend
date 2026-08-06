"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function fetchRentalRequest() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/requests`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}

export async function fetchPropertyRequests(propertyId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/requests/${propertyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch property requests:", error);
    return { success: false, data: [] };
  }
}

export async function updateRentalStatus(
  requestId: string,
  propertyId: string,
  status: "APPROVED" | "REJECTED",
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord-dashboard/requests/${requestId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status, propertyId }),
      },
    );

    const data = await res.json();

    revalidatePath(`/landlord-dashboard/requests/${propertyId}`);

    return data;
  } catch (error) {
    console.error("Failed to update rental status:", error);
    return { success: false };
  }
}
