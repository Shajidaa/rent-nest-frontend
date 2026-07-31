import axios from "axios";
import { cookies } from "next/headers";

export async function fetchRental() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/rentals`,
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
