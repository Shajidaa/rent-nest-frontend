"use server";

import { cookies } from "next/headers";

export async function getRentedRentalForProperty(
  propertyId: string,
): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals/rented-id?propertyId=${propertyId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data?.data ?? null;
  } catch {
    return null;
  }
}
