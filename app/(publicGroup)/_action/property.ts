import { IProperty } from "@/lib/type";
import axios from "axios";

export async function fetchProperties(
  params: Record<string, string | string[] | undefined>,
) {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        params,
      },
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}
export async function getPropertyById(id: string): Promise<IProperty | null> {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/properties/${id}`,
    );
    return response.data?.data || response.data || null;
  } catch (error) {
    console.error("Failed to fetch property details:", error);
    return null;
  }
}
