"use client";

import { useEffect } from "react";
import { handleError } from "@/lib/error-handler";
import { isAppError } from "@/types/error";

/**
 * Global Error Component
 * - Must be its own file (global-error.tsx)
 * - Replaces the entire root layout when an error occurs
 * - Should NOT use the root layout since it's replacing it
 * - Should maintain basic HTML structure
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    handleError(error, {
      url: typeof window !== "undefined" ? window.location.href : undefined,
      additionalData: {
        digest: error.digest,
        errorType: "global",
      },
    });
  }, [error]);

  const appError = isAppError(error) ? error : null;
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-lg w-full">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-100 p-6">
                <svg
                  className="h-16 w-16 text-red-600"
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
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
              Critical Application Error
            </h1>

            {/* Error Message */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <p className="text-center text-gray-700 mb-4">
                {appError?.message ||
                  "A critical error has occurred and the application cannot continue. Please try refreshing the page."}
              </p>

              {/* Development Details */}
              {isDevelopment && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-4 p-4 bg-red-50 rounded border border-red-200">
                    <p className="text-sm font-mono text-red-800 mb-2">
                      <strong>Name:</strong> {error.name}
                    </p>
                    <p className="text-sm font-mono text-red-800 mb-2">
                      <strong>Message:</strong> {error.message}
                    </p>
                    {appError && (
                      <>
                        <p className="text-sm font-mono text-red-800 mb-2">
                          <strong>Code:</strong> {appError.code}
                        </p>
                        <p className="text-sm font-mono text-red-800 mb-2">
                          <strong>Severity:</strong> {appError.severity}
                        </p>
                        {appError.context && (
                          <p className="text-sm font-mono text-red-800 mb-2">
                            <strong>Context:</strong>{" "}
                            {JSON.stringify(appError.context, null, 2)}
                          </p>
                        )}
                      </>
                    )}
                    {error.digest && (
                      <p className="text-sm font-mono text-red-800 mb-2">
                        <strong>Digest:</strong> {error.digest}
                      </p>
                    )}
                    {error.stack && (
                      <pre className="text-xs font-mono text-red-700 overflow-x-auto mt-2">
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
                onClick={() => window.location.reload()}
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
                Reload Page
              </button>

              <button
                onClick={reset}
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
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Try Again
              </button>
            </div>

            {/* Support Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                If the problem persists, please{" "}
                <a
                  href="mailto:support@example.com"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  contact support
                </a>
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

/**
 * Error Metadata for Server Components
 * Next.js uses this to generate error information
 */
export const metadata = {
  title: "Critical Error | Application Error",
  description: "A critical error has occurred in the application.",
};
