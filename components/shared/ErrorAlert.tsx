"use client";

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

interface ErrorAlertProps {
  message: string;
  severity?: ErrorSeverity;
  title?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const severityStyles = {
  low: {
    container: "bg-blue-50 border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-800",
    message: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  medium: {
    container: "bg-yellow-50 border-yellow-200",
    icon: "text-yellow-600",
    title: "text-yellow-800",
    message: "text-yellow-700",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  high: {
    container: "bg-orange-50 border-orange-200",
    icon: "text-orange-600",
    title: "text-orange-800",
    message: "text-orange-700",
    button: "bg-orange-600 hover:bg-orange-700",
  },
  critical: {
    container: "bg-red-50 border-red-200",
    icon: "text-red-600",
    title: "text-red-800",
    message: "text-red-700",
    button: "bg-red-600 hover:bg-red-700",
  },
};

export function ErrorAlert({
  message,
  severity = "medium",
  title,
  onRetry,
  onDismiss,
  className = "",
}: ErrorAlertProps) {
  const styles = severityStyles[severity];

  return (
    <div
      className={`rounded-lg border p-4 ${styles.container} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        {/* Icon */}
        <div className="shrink-0">
          <svg
            className={`h-5 w-5 ${styles.icon}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          )}
          <div className={`text-sm ${styles.message} ${title ? "mt-1" : ""}`}>
            {message}
          </div>

          {/* Actions */}
          {(onRetry || onDismiss) && (
            <div className="mt-3 flex gap-2">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className={`text-sm font-medium ${styles.message} underline hover:no-underline`}
                >
                  Try again
                </button>
              )}
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className={`text-sm font-medium ${styles.message} underline hover:no-underline`}
                >
                  Dismiss
                </button>
              )}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={`inline-flex rounded-md p-1.5 ${styles.message} hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                <span className="sr-only">Dismiss</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Error Toast Component
 * Smaller, dismissible error notification
 */
export function ErrorToast({
  message,
  onDismiss,
  className = "",
}: {
  message: string;
  onDismiss?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`fixed bottom-4 right-4 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 shadow-lg ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <svg
          className="h-5 w-5 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-auto inline-flex text-red-700 hover:text-red-900"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Error Page Component
 * Full-page error display for serious errors
 */
export function ErrorPage({
  title = "Something went wrong",
  message,
  onRetry,
  onGoHome,
  className = "",
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-50 px-4 ${className}`}
    >
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <svg
              className="h-16 w-16 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>

        {message && <p className="mb-8 text-lg text-gray-600">{message}</p>}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          )}
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Go Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
