"use server";

import { API_CONFIG } from "@/lib/constants";
import { Category } from "@/features/categories/types/categories";

/**
 * Server Actions — All data fetching happens here with fetch()
 * These can be called from both Server Components and Client Components
 * This ensures 100% compliance: "fetch inside server actions only"
 */

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