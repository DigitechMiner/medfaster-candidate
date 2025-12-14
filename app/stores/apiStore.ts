'use client';

import { create } from 'zustand';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { devtools } from 'zustand/middleware';
import { apiClient, ApiError } from '@/api/client';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface ApiStoreState {
  isLoading: boolean;
  error: string | null;
}

interface ApiStoreActions {
  request: <T = any>(
    config: AxiosRequestConfig
  ) => Promise<{ data: T; status: number }>;
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<{ data: T; status: number }>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<{ data: T; status: number }>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<{ data: T; status: number }>;
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<{ data: T; status: number }>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<{ data: T; status: number }>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

type ApiStore = ApiStoreState & ApiStoreActions;

export const useApiStore = create<ApiStore>()(
  devtools(
    (set, get) => ({
      isLoading: false,
      error: null,

      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),

      request: async <T = any>(config: AxiosRequestConfig) => {
        set({ isLoading: true, error: null });
        try {
          const response: AxiosResponse<T> = await apiClient.request<T>(config);
          set({ isLoading: false, error: null });
          return {
            data: response.data,
            status: response.status,
          };
        } catch (error) {
          set({ isLoading: false });
          if (error instanceof ApiError) {
            set({ error: error.message });
            throw error;
          }
          const apiError = new ApiError(500, 'An unexpected error occurred');
          set({ error: apiError.message });
          throw apiError;
        }
      },

      get: async <T = any>(url: string, config?: AxiosRequestConfig) => {
        return get().request<T>({ ...config, method: 'GET', url });
      },

      post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return get().request<T>({ ...config, method: 'POST', url, data });
      },

      put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return get().request<T>({ ...config, method: 'PUT', url, data });
      },

      patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return get().request<T>({ ...config, method: 'PATCH', url, data });
      },

      delete: async <T = any>(url: string, config?: AxiosRequestConfig) => {
        return get().request<T>({ ...config, method: 'DELETE', url });
      },
    }),
    { name: 'ApiStore' }
  )
);
