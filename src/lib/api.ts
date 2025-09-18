import { create, ApiResponse, ApisauceInstance } from 'apisauce';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create apisauce instance with credentials
export const api: ApisauceInstance = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Enable credentials for all requests
});

// Variable pour éviter les requêtes multiples simultanées
let isRefreshing = false;
interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Remove manual token handling - cookies are sent automatically

// Add response interceptor for token refresh
api.addResponseTransform(async (response: any) => {
  if (response.status === 401 && !response.config._retry) {
    if (isRefreshing) {
      // Si un refresh est déjà en cours, attendre qu'il se termine
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        // Retry original request (cookies will be sent automatically)
        return api.any(response.config);
      }).catch(err => {
        throw err;
      });
    }

    if (response.config) {
      response.config._retry = true;
    }
    isRefreshing = true;

    try {
      // Call refresh endpoint - cookies are sent automatically
      const refreshResponse = await api.post('/auth/refresh');
      
      if (refreshResponse.ok) {
        processQueue(null, 'refreshed');
        
        // Retry original request (cookies updated automatically by server)
        return api.any(response.config);
      }
    } catch (refreshError) {
      processQueue(refreshError, null);
      
      // Refresh failed, redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  }
});

// Generic request handler
async function handleResponse<T>(response: ApiResponse<T>): Promise<T> {
  console.log('API Response:', {
    ok: response.ok,
    status: response.status,
    problem: response.problem,
    data: response.data
  });

  if (!response.ok) {
    const status = response.status || 500;
    const errorData = response.data as { message?: string } | undefined;
    const errorMessage = errorData?.message || response.problem || 'Unknown error';
    console.error('API Error:', { status, errorMessage, data: response.data });
    throw new ApiError(status, errorMessage, response.data);
  }
  
  return response.data as T;
}

// GET request
export async function get<T>(endpoint: string): Promise<T> {
  const response = await api.get<T>(endpoint);
  return handleResponse(response);
}

// POST request
export async function post<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await api.post<T>(endpoint, data);
  return handleResponse(response);
}

// PUT request
export async function put<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await api.put<T>(endpoint, data);
  return handleResponse(response);
}

// PATCH request
export async function patch<T>(endpoint: string, data?: unknown): Promise<T> {
  const response = await api.patch<T>(endpoint, data);
  return handleResponse(response);
}

// DELETE request
export async function del<T>(endpoint: string): Promise<T> {
  const response = await api.delete<T>(endpoint);
  return handleResponse(response);
}

export default api;