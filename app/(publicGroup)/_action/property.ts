import { IProperty } from "@/lib/type";
import axios from "axios";

// "mirpur dhaka" → "Mirpur Dhaka"
function toTitleCase(str: string) {
  return str
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function fetchProperties(
  params: Record<string, string | string[] | undefined>,
) {
  // Normalize city to title case so "mirpur" matches "Mirpur"
  const normalized: Record<string, string | string[] | undefined> = { ...params };

  if (typeof normalized.city === "string" && normalized.city.trim()) {
    const parts = normalized.city.trim().split(/[\s,]+/).filter(Boolean);
    // Use first word as city, rest joined as searchTerm fallback
    normalized.city = toTitleCase(parts[0]);
    // If user typed "mirpur dhaka" treat full string as searchTerm too
    if (!normalized.searchTerm) {
      normalized.searchTerm = normalized.city;
    }
  }

  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/properties`,
      {
        params: normalized,
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
