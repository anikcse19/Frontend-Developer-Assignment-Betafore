/**
 * Custom Error Types for the Application
 * Provides structured error handling with proper error codes and severity levels
 */

export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum ErrorCode {
  // Network Errors (1000-1999)
  NETWORK_ERROR = "NETWORK_ERROR",
  API_TIMEOUT = "API_TIMEOUT",
  API_ERROR = "API_ERROR",
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // Validation Errors (2000-2999)
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",

  // Authentication Errors (3000-3999)
  UNAUTHORIZED = "UNAUTHORIZED",
  AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  FORBIDDEN = "FORBIDDEN",

  // Resource Errors (4000-4999)
  NOT_FOUND = "NOT_FOUND",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_DELETED = "RESOURCE_DELETED",

  // Server Errors (5000-5999)
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  DATABASE_ERROR = "DATABASE_ERROR",

  // Application Errors (6000-6999)
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
}

export interface ErrorContext {
  timestamp: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  additionalData?: Record<string, unknown>;
}

export interface ErrorMetadata {
  code: ErrorCode;
  severity: ErrorSeverity;
  userMessage: string;
  technicalMessage?: string;
  context?: ErrorContext;
  statusCode?: number;
  recoverable?: boolean;
}

/**
 * Base Application Error Class
 * All custom errors should extend this class
 */
export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly severity: ErrorSeverity;
  public readonly statusCode: number;
  public readonly recoverable: boolean;
  public context?: ErrorContext;
  public readonly originalError?: Error;

  constructor(metadata: ErrorMetadata & { originalError?: Error }) {
    super(metadata.userMessage);

    this.name = this.constructor.name;
    this.code = metadata.code;
    this.severity = metadata.severity;
    this.statusCode = metadata.statusCode || 500;
    this.recoverable = metadata.recoverable ?? true;
    this.context = metadata.context;
    this.originalError = metadata.originalError;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Serialize error for logging
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      severity: this.severity,
      message: this.message,
      statusCode: this.statusCode,
      recoverable: this.recoverable,
      context: this.context,
      stack: this.stack,
      originalError: this.originalError
        ? {
            name: this.originalError.name,
            message: this.originalError.message,
            stack: this.originalError.stack,
          }
        : undefined,
    };
  }
}

/**
 * Network Related Errors
 */
export class NetworkError extends AppError {
  constructor(message: string, originalError?: Error) {
    super({
      code: ErrorCode.NETWORK_ERROR,
      severity: ErrorSeverity.MEDIUM,
      userMessage: message || "Network connection failed. Please check your internet connection.",
      statusCode: 503,
      recoverable: true,
      originalError,
    });
  }
}

export class ApiTimeoutError extends AppError {
  constructor(timeout: number, originalError?: Error) {
    super({
      code: ErrorCode.API_TIMEOUT,
      severity: ErrorSeverity.MEDIUM,
      userMessage: `Request timeout. The server took too long to respond (timeout: ${timeout}ms).`,
      statusCode: 504,
      recoverable: true,
      originalError,
    });
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    super({
      code: ErrorCode.RATE_LIMIT_EXCEEDED,
      severity: ErrorSeverity.MEDIUM,
      userMessage: "Too many requests. Please try again later.",
      statusCode: 429,
      recoverable: true,
      context: {
        timestamp: new Date().toISOString(),
        additionalData: { retryAfter },
      },
    });
  }
}

/**
 * Validation Errors
 */
export class ValidationError extends AppError {
  constructor(message: string, field?: string, originalError?: Error) {
    super({
      code: ErrorCode.VALIDATION_ERROR,
      severity: ErrorSeverity.LOW,
      userMessage: message,
      statusCode: 400,
      recoverable: true,
      context: {
        timestamp: new Date().toISOString(),
        additionalData: { field },
      },
      originalError,
    });
  }
}

/**
 * Authentication & Authorization Errors
 */
export class UnauthorizedError extends AppError {
  constructor(message?: string, originalError?: Error) {
    super({
      code: ErrorCode.UNAUTHORIZED,
      severity: ErrorSeverity.HIGH,
      userMessage: message || "You need to log in to access this resource.",
      statusCode: 401,
      recoverable: true,
      originalError,
    });
  }
}

export class ForbiddenError extends AppError {
  constructor(message?: string, originalError?: Error) {
    super({
      code: ErrorCode.FORBIDDEN,
      severity: ErrorSeverity.HIGH,
      userMessage: message || "You don't have permission to access this resource.",
      statusCode: 403,
      recoverable: false,
      originalError,
    });
  }
}

export class TokenExpiredError extends AppError {
  constructor(originalError?: Error) {
    super({
      code: ErrorCode.TOKEN_EXPIRED,
      severity: ErrorSeverity.HIGH,
      userMessage: "Your session has expired. Please log in again.",
      statusCode: 401,
      recoverable: true,
      originalError,
    });
  }
}

/**
 * Resource Errors
 */
export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super({
      code: ErrorCode.NOT_FOUND,
      severity: ErrorSeverity.LOW,
      userMessage: `${resource} not found.`,
      statusCode: 404,
      recoverable: false,
    });
  }
}

/**
 * Server Errors
 */
export class InternalServerError extends AppError {
  constructor(message?: string, originalError?: Error) {
    super({
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      severity: ErrorSeverity.CRITICAL,
      userMessage: message || "An unexpected error occurred. Please try again later.",
      statusCode: 500,
      recoverable: false,
      originalError,
    });
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message?: string, originalError?: Error) {
    super({
      code: ErrorCode.SERVICE_UNAVAILABLE,
      severity: ErrorSeverity.HIGH,
      userMessage: message || "Service is temporarily unavailable. Please try again later.",
      statusCode: 503,
      recoverable: true,
      originalError,
    });
  }
}

/**
 * Type guard to check if an error is an instance of AppError
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

/**
 * Convert unknown error to AppError
 */
export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message, error);
  }

  if (typeof error === "string") {
    return new InternalServerError(error);
  }

  return new InternalServerError("An unknown error occurred");
}
