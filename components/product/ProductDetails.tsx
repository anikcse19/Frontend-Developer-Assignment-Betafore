"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/features/products/types/products";
import { Star, ShoppingBag, Heart } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const rating = product.rating;
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 >= 0.5;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400">No Image Available</p>
              </div>
            ) : (
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
                onError={() => setImageError(true)}
                priority
              />
            )}
          </div>

          {/* Thumbnail (reuses same image for now) */}
          <div className="flex gap-2">
            <div
              className={`relative w-20 h-20 border-2 rounded cursor-pointer overflow-hidden ${
                selectedImage === 0 ? "border-[#12b1c1]" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(0)}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <div>
            <span className="text-sm text-gray-500 capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 leading-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(fullStars)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              {hasHalfStar && (
                <Star size={16} className="fill-yellow-400 text-yellow-400 half-star" />
              )}
              {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                <Star key={i} size={16} className="text-gray-300" />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating.rate} ({rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl md:text-5xl font-semibold text-[#12b1c1]">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-800">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.title}. This high-quality product from our{" "}
              <span className="capitalize">{product.category}</span> collection
              is designed to meet your needs. Perfect for everyday use with
              exceptional quality and style.
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-700">Quantity</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="flex-1 bg-[#12b1c1] hover:bg-[#0ea5b4] text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            <button className="w-full sm:w-auto px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Heart size={20} className="text-gray-600" />
              <span className="text-gray-700">Wishlist</span>
            </button>
          </div>

          {/* Product Info Cards */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <p className="text-sm font-medium text-gray-800 capitalize">
                {product.category}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Product ID</p>
              <p className="text-sm font-medium text-gray-800">{product.id}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 col-span-2">
              <p className="text-xs text-gray-500 mb-1">Availability</p>
              <p className="text-sm font-medium text-green-600">In Stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}