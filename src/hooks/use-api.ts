import { useState, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "@/interfaces/IApiError";
import { ApiRequestConfig } from "@/interfaces/IApiRequestConfig";
import { UseApiResponse } from "@/interfaces/IUseApiResponse";

export const useApi = <T = unknown>(): UseApiResponse<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [data, setData] = useState<T | null>(null);

  const handleError = (error: AxiosError): ApiError => {
    const axiosError = error as AxiosError<{ message: string }>;

    return {
      message: axiosError.response?.data?.message || axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    };
  };

  const executeRequest = useCallback(
    async <TBody = unknown>({
      url,
      method = "GET",
      body,
      headers = {},
      params = {},
    }: ApiRequestConfig<TBody>): Promise<T> => {
      try {
        setLoading(true);
        setError(null);

        const config: AxiosRequestConfig = {
          url,
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          params,
          data: body,
        };

        const response: AxiosResponse<T> = await axios(config);

        setData(response.data);

        return response.data;
      } catch (err) {
        const apiError = handleError(err as AxiosError);

        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const get = useCallback(
    (
      url: string,
      params: Record<string, string | number | boolean> = {},
      headers: Record<string, string> = {},
    ): Promise<T> => {
      return executeRequest({ url, method: "GET", params, headers });
    },
    [executeRequest],
  );

  const post = useCallback(
    <TBody = unknown>(
      url: string,
      body: TBody,
      headers: Record<string, string> = {},
    ): Promise<T> => {
      return executeRequest({ url, method: "POST", body, headers });
    },
    [executeRequest],
  );

  const put = useCallback(
    <TBody = unknown>(
      url: string,
      body: TBody,
      headers: Record<string, string> = {},
    ): Promise<T> => {
      return executeRequest({ url, method: "PUT", body, headers });
    },
    [executeRequest],
  );

  const del = useCallback(
    (url: string, headers: Record<string, string> = {}): Promise<T> => {
      return executeRequest({
        url,
        method: "DELETE",
        headers,
      });
    },
    [executeRequest],
  );

  const patch = useCallback(
    (url: string, headers: Record<string, string> = {}): Promise<T> => {
      return executeRequest({
        url,
        method: "PATCH",
        headers,
      });
    },
    [executeRequest],
  );

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    delete: del,
    patch,
  };
};
