"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { handleError } from "@/lib/error-handler";
import { isAppError } from "@/types/error";

/**
 * Error Component for Route-Specific Errors
 * - Replaces the page content when an error occurs
 * - Keeps the root layout intact
 * - Can be reset to retry rendering the page
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    handleError(error, {
      url: typeof window !== "undefined" ? window.location.href : undefined,
      additionalData: {
        digest: error.digest,
        errorType: "route",
      },
    });
  }, [error]);

  const appError = isAppError(error) ? error : null;
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-yellow-100 p-6">
            <svg
              className="h-16 w-16 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Error Title */}
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>

        {/* Error Message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-center text-gray-700 mb-4">
            {appError?.message ||
              "An error occurred while loading this page. Please try again."}
          </p>

          {/* Development Details */}
          {isDevelopment && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                Technical Details
              </summary>
              <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm font-mono text-yellow-800 mb-2">
                  <strong>Name:</strong> {error.name}
                </p>
                <p className="text-sm font-mono text-yellow-800 mb-2">
                  <strong>Message:</strong> {error.message}
                </p>
                {appError && (
                  <>
                    <p className="text-sm font-mono text-yellow-800 mb-2">
                      <strong>Code:</strong> {appError.code}
                    </p>
                    <p className="text-sm font-mono text-yellow-800 mb-2">
                      <strong>Severity:</strong> {appError.severity}
                    </p>
                    {appError.context && (
                      <p className="text-sm font-mono text-yellow-800 mb-2">
                        <strong>Context:</strong>{" "}
                        {JSON.stringify(appError.context, null, 2)}
                      </p>
                    )}
                  </>
                )}
                {error.digest && (
                  <p className="text-sm font-mono text-yellow-800 mb-2">
                    <strong>Digest:</strong> {error.digest}
                  </p>
                )}
                {error.stack && (
                  <pre className="text-xs font-mono text-yellow-700 overflow-x-auto mt-2">
                    {error.stack}
                  </pre>
                )}
              </div>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go Home
          </button>
        </div>

        {/* Support Link */}
        {error.digest && (
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">Error ID: {error.digest}</p>
          </div>
        )}
      </div>
    </div>
  );
}
