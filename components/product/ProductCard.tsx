"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/features/products/types/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="max-w-70 border border-gray-200 p-5 bg-white font-sans">
      {/* Category */}
      <p className="text-[#333333] text-sm mb-4 capitalize">
        {product.category}
      </p>

      {/* Product Title */}
      <h2
        title={product.title}
        className="text-[#1a6b72] text-xl font-medium mb-4 leading-tight truncate"
      >
        {product.title}
      </h2>

      {/* Product Image */}
      <div className="relative w-full h-40 mb-10">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 280px) 100vw, 280px"
            style={{ objectFit: "contain" }}
            onError={() => {
              console.error("Image failed to load:", product.image);
              setImageError(true);
            }}
          />
        )}
      </div>

      {/* Pricing Section */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[#20b2aa] text-xl font-semibold">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-gray-400 text-sm flex items-center gap-1">
          ⭐ {product.rating.rate} ({product.rating.count})
        </span>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full cursor-pointer bg-[#17a2b8] hover:bg-[#138496] text-white py-3 px-4 transition-colors text-xl font-light">
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
