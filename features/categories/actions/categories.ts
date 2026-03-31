"use server";
import { API_CONFIG } from "@/lib/constants";
import { Category } from "@/features/categories/types/categories";

export async function getCategories(): Promise<Category[]> {
  const url = `${API_CONFIG.BASE_URL}/products/categories`;

  const response = await fetch(url, {
    next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories (status: ${response.status})`);
  }

  const data = await response.json();
  return data.data || [];
}
