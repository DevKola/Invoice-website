const DEFAULT_API_BASE_URL = "https://localhost:7164";
const DEFAULT_API_TIMEOUT = 10000;

const parseTimeout = (value: string | undefined) => {
  if (!value) {
    return DEFAULT_API_TIMEOUT;
  }

  const timeout = Number(value);

  return Number.isFinite(timeout) && timeout > 0 ? timeout : DEFAULT_API_TIMEOUT;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const apiConfig = {
  baseURL: trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL),
  timeout: parseTimeout(import.meta.env.VITE_API_TIMEOUT),
  defaultHeaders: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
} as const;

export type ApiConfig = typeof apiConfig;

