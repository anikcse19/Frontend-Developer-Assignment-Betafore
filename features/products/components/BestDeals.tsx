"use client";

import { useEffect, useState, useCallback } from "react";
import { CategoryNav } from "../../categories/components/CategoryNav";
import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/shared/LoadingSkeleton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { getProductsByCategory } from "@/features/products/actions/products";
import { getCategories } from "@/features/categories/actions/categories";
import { Category } from "@/features/categories/types/categories";
import { Product } from "../types/products";
import { handleError } from "@/lib/error-handler";

const BestDeals = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const cats = await getCategories();
      setCategories(cats);

      const initialCategory = cats[0]?.name || "";
      setSelectedCategory(initialCategory);

      const prods = await getProductsByCategory(initialCategory);
      setProducts(prods);
    } catch (err) {
      const appError = handleError(err, { url: window.location.href });
      setError(appError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCategoryChange = async (categoryName: string) => {
    try {
      setSelectedCategory(categoryName);
      setIsLoading(true);
      setError(null);

      const prods = await getProductsByCategory(categoryName);
      setProducts(prods);
    } catch (err) {
      const appError = handleError(err, { url: window.location.href });
      setError(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 sm:my-12 md:my-18 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 mb-8 pb-2">
        <h1 className="text-2xl font-light text-gray-800 mb-4 md:mb-0">
          <span className="text-[#12b1c1] font-medium">Best</span> Deals
        </h1>

        <div className="flex items-center gap-4 md:gap-12">
          {/* Client component for category navigation */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <CategoryNav
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="flex shrink-0 gap-2 ml-2 md:ml-4 -mt-3">
            <button
              className="p-1 text-gray-400 hover:text-black cursor-pointer"
              onClick={() => {
                const idx = categories.findIndex((c) => c.name === selectedCategory);
                const prev = idx > 0 ? idx - 1 : categories.length - 1;
                handleCategoryChange(categories[prev].name);
              }}
            >
              ◀
            </button>
            <button
              className="p-1 text-gray-400 hover:text-black cursor-pointer"
              onClick={() => {
                const idx = categories.findIndex((c) => c.name === selectedCategory);
                const next = idx < categories.length - 1 ? idx + 1 : 0;
                handleCategoryChange(categories[next].name);
              }}
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <ErrorAlert
          message={error}
          severity="medium"
          title="Failed to load deals"
          onRetry={loadData}
          onDismiss={() => setError(null)}
        />
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BestDeals;
