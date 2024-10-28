import { ApiError } from "./IApiError";

export interface UseApiResponse<T> {
  loading: boolean;
  error: ApiError | null;
  data: T | null;
  get: (
    url: string,
    params?: Record<string, string | number | boolean>,
    headers?: Record<string, string>,
  ) => Promise<T>;
  post: <TBody = unknown>(
    url: string,
    body: TBody,
    headers?: Record<string, string>,
  ) => Promise<T>;
  put: <TBody = unknown>(
    url: string,
    body: TBody,
    headers?: Record<string, string>,
  ) => Promise<T>;
  delete: (url: string, headers?: Record<string, string>) => Promise<T>;
  patch: (url: string, headers?: Record<string, string>) => Promise<T>;
}
