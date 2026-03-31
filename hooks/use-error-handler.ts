/**
 * React Error Handler Hook
 * Provides error handling utilities for React components
 */

import { useState, useCallback, useRef } from "react";
import { handleError, handleApiError } from "@/lib/error-handler";
import type { AppError } from "@/types/error";

/**
 * Error state interface
 */
interface ErrorState {
  error: string | null;
  isError: boolean;
}

/**
 * Use error handler hook
 * Provides methods to handle errors in React components
 */
export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  });
  const retryCallbackRef = useRef<(() => Promise<unknown>) | null>(null);

  /**
   * Handle errors and update state
   */
  const handleCatch = useCallback(
    (error: unknown, context?: Record<string, unknown>) => {
      const appError = handleError(error, {
        additionalData: context,
        url: typeof window !== "undefined" ? window.location.href : undefined,
      });

      setErrorState({
        error: appError.message,
        isError: true,
      });

      return appError;
    },
    [],
  );

  /**
   * Handle API response errors
   */
  const handleApiResponse = useCallback(
    async (
      response: Response,
      responseData?: unknown,
    ): Promise<AppError | null> => {
      if (!response.ok) {
        const error = handleApiError(response, responseData);
        setErrorState({
          error: error.message,
          isError: true,
        });
        return error;
      }
      return null;
    },
    [],
  );

  /**
   * Wrap async function with error handling
   */
  const withErrorHandling = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      options?: {
        onSuccess?: (data: T) => void;
        onError?: (error: AppError) => void;
      },
    ): Promise<T | null> => {
      try {
        setErrorState({ error: null, isError: false });
        const result = await asyncFn();
        options?.onSuccess?.(result);
        return result;
      } catch (error) {
        const appError = handleCatch(error);
        options?.onError?.(appError);
        return null;
      }
    },
    [handleCatch],
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setErrorState({ error: null, isError: false });
  }, []);

  /**
   * Retry the last failed operation
   */
  const retry = useCallback(async () => {
    if (retryCallbackRef.current) {
      return withErrorHandling(retryCallbackRef.current);
    }
    return null;
  }, [withErrorHandling]);

  /**
   * Set retry callback
   */
  const setRetryCallback = useCallback((callback: () => Promise<unknown>) => {
    retryCallbackRef.current = callback;
  }, []);

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleCatch,
    handleApiResponse,
    withErrorHandling,
    clearError,
    retry,
    setRetryCallback,
  };
}

/**
 * Simplified error handling hook for basic use cases
 */
export function useSimpleError() {
  const [error, setError] = useState<string | null>(null);

  const handleCatch = useCallback((err: unknown) => {
    const appError = handleError(err);
    setError(appError.message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    setError,
    handleCatch,
    clearError,
  };
}

/**
 * Async operation hook with loading and error states
 */
export function useAsyncOperation<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await asyncFn();
        setData(result);
        return result;
      } catch (err) {
        const appError = handleError(err);
        setError(appError.message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}
