'use client';

import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create axios instance
export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable cookies for authentication
  });

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message =
          (error.response.data as any)?.message ||
          error.message ||
          'An error occurred';
        throw new ApiError(status, message, error.response.data);
      } else if (error.request) {
        // Request made but no response received
        throw new ApiError(500, 'Network error occurred', error.request);
      } else {
        // Something else happened
        throw new ApiError(500, error.message || 'An unexpected error occurred');
      }
    }
  );

  return instance;
};

export const apiClient = createAxiosInstance();
