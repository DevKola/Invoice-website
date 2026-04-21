import axios from 'axios';

export interface ApiErrorDetails {
  [key: string]: unknown;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: ApiErrorDetails | string | null;
  isNetworkError: boolean;

  constructor({
    message,
    status,
    code,
    details,
    isNetworkError = false,
  }: {
    message: string;
    status?: number;
    code?: string;
    details?: ApiErrorDetails | string | null;
    isNetworkError?: boolean;
  }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
    this.isNetworkError = isNetworkError;
  }
}

const getErrorMessage = (status?: number, fallback?: string) => {
  if (fallback) return fallback;
  if (status === 404) return 'The requested resource could not be found.';
  if (status === 422) return 'The request could not be processed.';
  if (status && status >= 500) return 'Something went wrong on the server. Please try again.';
  return 'Something went wrong. Please try again.';
};

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    const responseMessage =
      typeof responseData === 'object' && responseData !== null && 'message' in responseData
        ? String(responseData.message)
        : undefined;

    return new ApiError({
      message: error.response
        ? getErrorMessage(status, responseMessage || error.message)
        : 'Unable to reach the server. Check your connection and try again.',
      status,
      code: error.code,
      details:
        typeof responseData === 'object' || typeof responseData === 'string'
          ? (responseData as ApiErrorDetails | string)
          : null,
      isNetworkError: !error.response,
    });
  }

  if (error instanceof Error) {
    return new ApiError({ message: error.message, details: null });
  }

  return new ApiError({ message: 'An unexpected error occurred.', details: null });
};
