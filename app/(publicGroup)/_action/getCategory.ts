import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getCategory() {
  return fetchWithAuth(`${process.env.BACKEND_API_URL}/api/categories`);
}
