export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://mm-assesment-server.vercel.app/api/v1",
  CACHE_TIME: {
    SHORT: 1800, // 30 minutes
    DEFAULT: 3600, // 1 hour
  },
  TIMEOUT: {
    DEFAULT: 10000, // 10 seconds
    SHORT: 5000, // 5 seconds
    LONG: 30000, // 30 seconds
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000, // 1 second
    MAX_DELAY: 10000, // 10 seconds
  },
} as const;

/**
 * Error Handling Configuration
 */
export const ERROR_CONFIG = {
  // Enable/disable detailed error messages in development
  SHOW_ERROR_DETAILS: process.env.NODE_ENV === "development",

  // Enable/disable error logging to console
  ENABLE_CONSOLE_LOGGING: process.env.NODE_ENV === "development",

  // Maximum number of similar errors to log in quick succession
  MAX_ERROR_FREQUENCY: 5,

  // Time window for error frequency tracking (ms)
  ERROR_FREQUENCY_WINDOW: 5000, // 5 seconds

  // Enable/disable error reporting to external services
  ENABLE_ERROR_REPORTING: process.env.NODE_ENV === "production",

  // User-facing error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: "Network connection failed. Please check your internet connection.",
    SERVER_ERROR: "Server error. Please try again later.",
    TIMEOUT: "Request timeout. The server took too long to respond.",
    NOT_FOUND: "The requested resource was not found.",
    UNAUTHORIZED: "You need to log in to access this resource.",
    FORBIDDEN: "You don't have permission to access this resource.",
    VALIDATION_ERROR: "Invalid input. Please check your data and try again.",
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  },

  // Recovery actions
  RECOVERY_ACTIONS: {
    RETRY: "retry",
    REFRESH: "refresh",
    CONTACT_SUPPORT: "contact_support",
    GO_HOME: "go_home",
  },
} as const;

/**
 * Error Severity Levels
 */
export const ERROR_SEVERITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;
