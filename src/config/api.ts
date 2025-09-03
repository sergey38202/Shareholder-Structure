import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'https://api.shareholders.com/v1',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers) {
      config.headers['X-Request-ID'] = `req_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    console.error(`API Error: ${error.response?.status} ${error.config?.url}`, {
      message: error.message,
      response: error.response?.data,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      console.warn('🔐 Unauthorized access - redirecting to login');
    }

    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;
      const retryAfter = error.response.headers['retry-after'] || 1;
      console.warn(`Rate limited - retrying after ${retryAfter}s`);

      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return apiClient(originalRequest);
    }

    if (!error.response && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('Network error - retrying request');

      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
