export interface ApiRequestConfig<T = unknown> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: T;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}
