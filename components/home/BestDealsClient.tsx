"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByCategory } from "@/actions/products";
import { useState, useEffect } from "react";

interface BestDealsClientProps {
  categories: Array<{ id: string; name: string }>;
}

export default function BestDealsClient({ categories }: BestDealsClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories.length > 0 ? categories[0].name : "",
  );

  useEffect(() => {
    const loadProducts = async () => {
      if (selectedCategory) {
        const products = await getProductsByCategory(selectedCategory);
        setProducts(products);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="px-18.75 bg-white my-23.5">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 mb-8 pb-2">
        <h1 className="text-2xl font-light text-gray-800 mb-4 md:mb-0">
          <span className="text-[#12b1c1] font-medium">Best</span> Deals
        </h1>

        <div className="flex items-center gap-12">
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-xs font-bold cursor-pointer tracking-wider whitespace-nowrap pb-2 border-b-2 transition-colors capitalize ${
                  selectedCategory === cat.name
                    ? "text-[#12b1c1] border-[#12b1c1]"
                    : "text-gray-700 border-transparent hover:text-[#12b1c1]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex gap-2 ml-4 -mt-3">
            <button className="p-1 text-gray-400 hover:text-black">◀</button>
            <button className="p-1 text-gray-400 hover:text-black">▶</button>
          </div>
        </div>
      </div>

      {/* Grid Section - 6 columns as per design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    </div>
  );
}
