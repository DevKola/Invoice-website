import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { apiConfig } from './config';
import { normalizeApiError } from './errors';

export type ApiRequestConfig<TData = unknown> = AxiosRequestConfig<TData>;

const withDefaultHeaders = (config: InternalAxiosRequestConfig) => {
  const headers = AxiosHeaders.from(config.headers);

  if (!headers.has('Accept')) {
    headers.set('Accept', apiConfig.defaultHeaders.Accept);
  }

  const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData;

  if (isFormData) {
    headers.delete('Content-Type');
  } else if (!headers.has('Content-Type')) {
    headers.set('Content-Type', apiConfig.defaultHeaders['Content-Type']);
  }

  config.headers = headers;
  return config;
};

const onRequest = (config: InternalAxiosRequestConfig) => withDefaultHeaders(config);
const onRequestError = (error: AxiosError) => Promise.reject(normalizeApiError(error));
const onResponse = <T>(response: AxiosResponse<T>) => response;
const onResponseError = (error: unknown) => Promise.reject(normalizeApiError(error));

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.defaultHeaders,
});

apiClient.interceptors.request.use(onRequest, onRequestError);
apiClient.interceptors.response.use(onResponse, onResponseError);

export const get = async <TResponse, TParams = unknown>(
  url: string,
  config?: ApiRequestConfig<TParams>,
): Promise<TResponse> => {
  const response = await apiClient.get<TResponse>(url, config);
  return response.data;
};

export const post = async <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: ApiRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await apiClient.post<TResponse>(url, body, config);
  return response.data;
};

export const put = async <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: ApiRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await apiClient.put<TResponse>(url, body, config);
  return response.data;
};

export const patch = async <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: ApiRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await apiClient.patch<TResponse>(url, body, config);
  return response.data;
};

export const remove = async <TResponse, TBody = unknown>(
  url: string,
  config?: ApiRequestConfig<TBody>,
): Promise<TResponse> => {
  const response = await apiClient.delete<TResponse>(url, config);
  return response.data;
};
