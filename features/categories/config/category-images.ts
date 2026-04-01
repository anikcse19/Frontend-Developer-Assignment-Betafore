

export const CATEGORY_IMAGES = {
  electronics: {
    imageUrl:
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Electronics - Latest gadgets and devices",
  },
  jewelery: {
    imageUrl:
      "https://images.pexels.com/photos/1738643/pexels-photo-1738643.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Jewelry - Elegant accessories",
  },
  "men's clothing": {
    imageUrl:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Men's Clothing - Stylish apparel for men",
  },
  "women's clothing": {
    imageUrl:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Women's Clothing - Fashion for women",
  },
} as const;

/**
 * Get category image by name
 * Returns a default image if category not found
 */
export function getCategoryImage(categoryName: string) {
  const normalizedKey = categoryName.toLowerCase().trim();
  const category = CATEGORY_IMAGES[normalizedKey as keyof typeof CATEGORY_IMAGES];

  if (category) {
    return category;
  }

  // Fallback for unknown categories
  return {
    imageUrl:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: `${categoryName} - Shop now`,
  };
}

/**
 * Extend Category type with image information
 */
export interface CategoryWithImage {
  id: number;
  name: string;
  imageUrl: string;
  imageAlt: string;
}

/**
 * Enrich categories with image information
 */
export function enrichCategoriesWithImages(
  categories: Array<{ id: number; name: string }>,
): CategoryWithImage[] {
  return categories.map((category) => {
    const imageData = getCategoryImage(category.name);
    return {
      ...category,
      imageUrl: imageData.imageUrl,
      imageAlt: imageData.alt,
    };
  });
}