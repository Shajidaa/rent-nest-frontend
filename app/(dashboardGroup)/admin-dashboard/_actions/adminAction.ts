"use server";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export async function getUsers(page: number = 1, limit: number = 10) {
  return fetchWithAuth(
    `${process.env.BACKEND_API_URL}/api/admin/users?page=${page}&limit=${limit}`,
  );
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
