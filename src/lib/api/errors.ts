import axios from "axios";

export interface ApiErrorDetails {
  [key: string]: unknown;
}

export interface ApiError {
  name: "ApiError";
  message: string;
  status?: number;
  code?: string;
  details?: ApiErrorDetails | string | null;
  isNetworkError: boolean;
}

const createApiError = ({
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
}): ApiError => ({
  name: "ApiError",
  message,
  status,
  code,
  details,
  isNetworkError,
});

const getErrorMessage = (status?: number, fallback?: string) => {
  if (fallback) return fallback;
  if (status === 404) return "The requested resource could not be found.";
  if (status === 422) return "The request could not be processed.";
  if (status && status >= 500)
    return "Something went wrong on the server. Please try again.";
  return "Something went wrong. Please try again.";
};

export const normalizeApiError = (error: unknown): ApiError => {
  if (isApiError(error)) return error;

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data;
    const responseMessage =
      typeof responseData === "object" &&
      responseData !== null &&
      "message" in responseData
        ? String(responseData.message)
        : undefined;

    return createApiError({
      message: error.response
        ? getErrorMessage(status, responseMessage || error.message)
        : "Unable to reach the server. Check your connection and try again.",
      status,
      code: error.code,
      details:
        typeof responseData === "object" || typeof responseData === "string"
          ? (responseData as ApiErrorDetails | string)
          : null,
      isNetworkError: !error.response,
    });
  }

  if (error instanceof Error) {
    return createApiError({ message: error.message, details: null });
  }

  return createApiError({
    message: "An unexpected error occurred.",
    details: null,
  });
};

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    "message" in error &&
    (error as { name?: unknown }).name === "ApiError"
  );
}
