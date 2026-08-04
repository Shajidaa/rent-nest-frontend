import { IProperty } from "@/lib/type";
import axios from "axios";

export async function fetchProperties(
  params: Record<string, string | string[] | undefined>,
) {
  try {
    const cleanParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() !== "") {
        cleanParams[key] = value.trim();
      }
    });

    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/properties`,
      { params: cleanParams },
    );

    return response.data?.data || response.data || [];
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
