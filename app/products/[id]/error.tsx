"use client";

import Link from "next/link";
import { ArrowLeft, PackageX } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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

      {/* Error Message */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 rounded-full p-6">
              <PackageX size={48} className="text-red-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>

          <p className="text-gray-600 mb-8">
            We couldn&apos;t load the product details. This might be due to a
            temporary issue or the product may no longer be available.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#12b1c1] text-white rounded-lg font-medium hover:bg-[#0ea5b4] transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <p className="text-sm font-medium text-red-800 mb-2">
                Error Details (Development Only):
              </p>
              <p className="text-xs text-red-700 font-mono">{error.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
