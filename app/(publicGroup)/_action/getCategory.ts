import axios from "axios";

export async function fetchCategories() {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/api/categories`,
    );

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}
