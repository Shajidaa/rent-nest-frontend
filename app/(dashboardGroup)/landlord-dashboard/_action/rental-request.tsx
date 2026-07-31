import axios from "axios";
import { cookies } from "next/headers";
  
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
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/landlord-dashboard/requests/${propertyId}`,
       {
     
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
      },
  
    )

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Failed to fetch property requests:", error)
    return { success: false, data: [] }
  }
}