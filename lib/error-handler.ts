import {
  AppError,
  toAppError,
  ErrorCode,
  ErrorSeverity,
  type ErrorContext,
} from "@/types/error";

interface ErrorLogger {
  logError(error: AppError): Promise<void> | void;
  logWarning(
    message: string,
    context?: Record<string, unknown>,
  ): Promise<void> | void;
  logInfo(
    message: string,
    context?: Record<string, unknown>,
  ): Promise<void> | void;
}

/**
 * Console-based Error Logger (Development)
 */
class ConsoleErrorLogger implements ErrorLogger {
  logError(error: AppError): void {
    const style = this.getStyleForSeverity(error.severity);
    console.error(
      `%c[${error.severity.toUpperCase()}] ${error.code}`,
      style,
      "\nMessage:",
      error.message,
      "\nContext:",
      error.context,
      "\nStack:",
      error.stack,
    );

    if (error.originalError) {
      console.error("Original Error:", error.originalError);
    }
  }

  logWarning(message: string, context?: Record<string, unknown>): void {
    console.warn(
      `%c[WARNING] ${message}`,
      "color: #FFA500; font-weight: bold;",
      context || "",
    );
  }

  logInfo(message: string, context?: Record<string, unknown>): void {
    console.info(
      `%c[INFO] ${message}`,
      "color: #0066CC; font-weight: bold;",
      context || "",
    );
  }

  private getStyleForSeverity(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.CRITICAL:
        return "color: #FF0000; font-weight: bold; font-size: 14px;";
      case ErrorSeverity.HIGH:
        return "color: #FF4444; font-weight: bold;";
      case ErrorSeverity.MEDIUM:
        return "color: #FFA500; font-weight: bold;";
      case ErrorSeverity.LOW:
        return "color: #FFD700;";
      default:
        return "color: #000000;";
    }
  }
}

/**
 * Error Handler Configuration
 */
interface ErrorHandlerConfig {
  logger: ErrorLogger;
  enableGlobalLogging: boolean;
  showErrorDetails: boolean;
  onServerError?: (error: AppError) => void;
  onClientError?: (error: AppError) => void;
}

class ErrorHandler {
  private config: ErrorHandlerConfig;
  private errorCounts: Map<string, number> = new Map();
  private lastErrorTime: Map<string, number> = new Map();

  constructor(config: ErrorHandlerConfig) {
    this.config = config;
    this.setupGlobalErrorHandlers();
  }

  /**
   * Handle an error with logging and potential recovery
   */
  handleError(error: unknown, context?: Partial<ErrorContext>): AppError {
    const appError = toAppError(error);

    // Add context if provided
    if (context) {
      appError.context = {
        ...appError.context,
        ...context,
        timestamp: new Date().toISOString(),
      };
    }

    // Track error frequency
    this.trackErrorFrequency(appError);

    // Log the error
    if (this.config.enableGlobalLogging) {
      this.config.logger.logError(appError);
    }

    // Call custom error callbacks
    if (typeof window !== "undefined") {
      this.config.onClientError?.(appError);
    } else {
      this.config.onServerError?.(appError);
    }

    return appError;
  }

  /**
   * Handle API errors specifically
   */
  handleApiError(response: Response, responseData?: unknown): AppError {
    const statusCode = response.status;
    let errorCode = ErrorCode.API_ERROR;
    let userMessage = "An error occurred while communicating with the server.";
    let severity = ErrorSeverity.MEDIUM;

    // Map HTTP status codes to error types
    switch (statusCode) {
      case 400:
        errorCode = ErrorCode.VALIDATION_ERROR;
        userMessage = "Invalid request. Please check your input.";
        severity = ErrorSeverity.LOW;
        break;
      case 401:
        errorCode = ErrorCode.UNAUTHORIZED;
        userMessage = "You need to log in to access this resource.";
        severity = ErrorSeverity.HIGH;
        break;
      case 403:
        errorCode = ErrorCode.FORBIDDEN;
        userMessage = "You don't have permission to access this resource.";
        severity = ErrorSeverity.HIGH;
        break;
      case 404:
        errorCode = ErrorCode.NOT_FOUND;
        userMessage = "The requested resource was not found.";
        severity = ErrorSeverity.LOW;
        break;
      case 429:
        errorCode = ErrorCode.RATE_LIMIT_EXCEEDED;
        userMessage = "Too many requests. Please try again later.";
        severity = ErrorSeverity.MEDIUM;
        break;
      case 500:
      case 502:
      case 503:
        errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
        userMessage = "Server error. Please try again later.";
        severity = ErrorSeverity.CRITICAL;
        break;
      case 504:
        errorCode = ErrorCode.API_TIMEOUT;
        userMessage = "Server timeout. Please try again later.";
        severity = ErrorSeverity.HIGH;
        break;
    }

    const error = new AppError({
      code: errorCode,
      severity,
      userMessage,
      statusCode,
      recoverable:
        statusCode >= 500 || statusCode === 401 || statusCode === 429,
      context: {
        timestamp: new Date().toISOString(),
        url: response.url,
        additionalData: {
          status: statusCode,
          statusText: response.statusText,
          responseData,
        },
      },
    });

    return this.handleError(error);
  }

  /**
   * Handle asynchronous errors in React components
   */
  handleAsyncError(
    error: unknown,
    setError: (error: string | null) => void,
    context?: Partial<ErrorContext>,
  ): void {
    const appError = this.handleError(error, context);
    setError(
      this.config.showErrorDetails ? appError.message : "An error occurred",
    );
  }

  /**
   * Track error frequency to prevent error spam
   */
  private trackErrorFrequency(error: AppError): void {
    const key = `${error.code}-${error.message}`;
    const now = Date.now();
    const lastTime = this.lastErrorTime.get(key) || 0;

    // Reset counter if more than 5 seconds have passed
    if (now - lastTime > 5000) {
      this.errorCounts.set(key, 0);
    }

    const count = (this.errorCounts.get(key) || 0) + 1;
    this.errorCounts.set(key, count);
    this.lastErrorTime.set(key, now);

    // Log warning if same error occurs frequently
    if (count >= 5) {
      this.config.logger.logWarning(
        `Error occurred ${count} times in quick succession: ${error.code}`,
        { error: error.toJSON() },
      );
    }
  }

  /**
   * Setup global error handlers for browser and Node.js
   */
  private setupGlobalErrorHandlers(): void {
    if (typeof window !== "undefined") {
      // Browser environment
      window.addEventListener("error", (event) => {
        this.handleError(event.error, {
          url: window.location.href,
          userAgent: navigator.userAgent,
        });
      });

      window.addEventListener("unhandledrejection", (event) => {
        this.handleError(event.reason, {
          url: window.location.href,
          userAgent: navigator.userAgent,
        });
      });
    } else {
      // Node.js environment
      process.on("uncaughtException", (error) => {
        this.handleError(error);
      });

      process.on("unhandledRejection", (reason) => {
        this.handleError(reason);
      });
    }
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<ErrorHandlerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

/**
 * Create singleton instance
 */
const logger = new ConsoleErrorLogger();

export const errorHandler = new ErrorHandler({
  logger,
  enableGlobalLogging: process.env.NODE_ENV === "development",
  showErrorDetails: process.env.NODE_ENV === "development",
  onClientError: (error) => {
    // Custom client-side error handling
    // For example, show toast notifications, update UI state, etc.
    if (error.severity === ErrorSeverity.CRITICAL) {
      // Handle critical errors
      console.error("CRITICAL ERROR:", error.message);
    }
  },
  onServerError: () => {
    // Custom server-side error handling
  },
});

/**
 * Convenience function to handle errors
 */
export function handleError(
  error: unknown,
  context?: Partial<ErrorContext>,
): AppError {
  return errorHandler.handleError(error, context);
}

/**
 * Convenience function to handle API errors
 */
export function handleApiError(
  response: Response,
  responseData?: unknown,
): AppError {
  return errorHandler.handleApiError(response, responseData);
}

/**
 * Higher-order function to wrap async functions with error handling
 */
export function withErrorHandling<
  T extends (...args: unknown[]) => Promise<unknown>,
>(fn: T, context?: Partial<ErrorContext>): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, context);
      throw error; // Re-throw to let caller handle
    }
  }) as T;
}
