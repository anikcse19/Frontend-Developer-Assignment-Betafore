"use server";

import { Product } from "@/features/products/types/products";
import { API_CONFIG } from "@/lib/constants";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/products`, {
    next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products (status: ${response.status})`);
  }

  const data = await response.json();
  return data.data || [];
}

export async function getProductsByCategory(
  categoryName: string,
): Promise<Product[]> {
  const url = `${API_CONFIG.BASE_URL}/products/category/${encodeURIComponent(categoryName)}`;

  const response = await fetch(url, {
    next: { revalidate: API_CONFIG.CACHE_TIME.SHORT },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products for category: ${categoryName} (status: ${response.status})`,
    );
  }

  const data = await response.json();
  return data.data || [];
}

export async function getProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`, {
    next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product with id: ${id} (status: ${response.status})`,
    );
  }

  const data = await response.json();
  return data.data || null;
}
