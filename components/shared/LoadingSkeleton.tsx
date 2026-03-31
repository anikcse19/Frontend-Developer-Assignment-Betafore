export default function ProductCardSkeleton() {
  return (
    <div className="max-w-70 border border-gray-200 p-5 bg-white font-sans animate-pulse">
      {/* Category */}
      <div className="h-4 bg-gray-200 rounded w-20 mb-4" />

      {/* Product Title */}
      <div className="h-6 bg-gray-200 rounded w-full mb-4" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />

      {/* Product Image */}
      <div className="w-full h-40 mb-10 bg-gray-200 rounded" />

      {/* Pricing Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>

      {/* Add to Cart Button */}
      <div className="w-full h-12 bg-gray-200 rounded" />
    </div>
  );
}
