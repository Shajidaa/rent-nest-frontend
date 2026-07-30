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
