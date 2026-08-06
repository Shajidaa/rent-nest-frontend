"use server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// export async function getUsers(page: number = 1, limit: number = 10) {
//   return fetchWithAuth(
//     `${process.env.BACKEND_API_URL}/api/admin/users?page=${page}&limit=${limit}`,
//   );
// }
export async function getUsers(
  page: number = 1,
  limit: number = 10,
  searchTerm: string = "",
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    params.append("searchTerm", searchTerm);
  }

  return fetchWithAuth(
    `${process.env.BACKEND_API_URL}/api/admin/users?${params.toString()}`,
  );
}
export async function toggleUserStatus(
  userId: string,
  currentStatus: "ACTIVE" | "BANNED" | string,
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

  try {
    // console.log(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`);
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ status: newStatus }),
        cache: "no-cache",
      },
    );

    // Revalidate the server component route to refresh users list automatically
    revalidatePath("/admin/users");

    return res;
  } catch (error) {
    console.error("Failed to update user status:", error);
    return { success: false, message: "Failed to update user status" };
  }
}
export async function getProperties(page: number = 1, limit: number = 10) {
  return fetchWithAuth(
    `${process.env.BACKEND_API_URL}/api/admin/properties?page=${page}&limit=${limit}`,
  );
}
export async function getRentals(page: number = 1, limit: number = 10) {
  return fetchWithAuth(
    `${process.env.BACKEND_API_URL}/api/admin/rentals?page=${page}&limit=${limit}`,
  );
}
export async function getCategories(page: number = 1, limit: number = 10) {
  return fetchWithAuth(
    `${process.env.BACKEND_API_URL}/api/categories?page=${page}&limit=${limit}`,
  );
}
