"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-blue-100 p-4">
            <svg
              className="h-16 w-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page not found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="mr-2 -ml-1 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            You can also:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Browse Products
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Search Catalog
            </Link>
            <span className="text-gray-300">•</span>
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
