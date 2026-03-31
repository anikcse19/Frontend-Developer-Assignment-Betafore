"use server";

import { Product } from "@/types/product";
import { API_CONFIG } from "@/lib/constants";

export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products`, {
      next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCategories(): Promise<Array<{ id: string; name: string }>> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products/categories`, {
      next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/products/category/${encodeURIComponent(categoryName)}`,
      {
        next: { revalidate: API_CONFIG.CACHE_TIME.SHORT }, // Cache for 30 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${categoryName}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching products for category ${categoryName}:`, error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/products/${id}`, {
      next: { revalidate: API_CONFIG.CACHE_TIME.DEFAULT }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id: ${id}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}
