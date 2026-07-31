import axios from "axios";
import { cookies } from "next/headers";

export async function getAllRental() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/admin/rentals`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}
