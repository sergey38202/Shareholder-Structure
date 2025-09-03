import type { AxiosResponse } from 'axios';
import apiClient from '@/config/api';
import type { ApiResponse } from '@/types/api';

export abstract class BaseApiService {
  protected handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    if (!response.data.success) {
      throw new Error(response.data.message || 'API request failed');
    }
    return response.data.data;
  }

  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      console.error('API Service Error:', error.message);
      throw error;
    }

    console.error('Unknown API Error:', error);
    throw new Error('An unexpected error occurred');
  }

  protected async get<T>(
    endpoint: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await apiClient.get<ApiResponse<T>>(endpoint, {
        params,
      });
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await apiClient.post<ApiResponse<T>>(
        endpoint,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async put<T>(
    endpoint: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await apiClient.put<ApiResponse<T>>(
        endpoint,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async delete<T>(
    endpoint: string,
    config?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(endpoint, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(
        endpoint,
        data,
        config
      );
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }
}
