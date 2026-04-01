import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#03484D] py-4">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white hover:text-[#12b1c1] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm">Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Loading Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="w-full aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <div className="h-14 bg-gray-200 rounded flex-1 animate-pulse"></div>
                <div className="h-14 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-20 bg-gray-200 rounded col-span-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}