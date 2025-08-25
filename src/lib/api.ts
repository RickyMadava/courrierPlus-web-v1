import { create, ApiResponse, ApisauceInstance } from 'apisauce';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: unknown) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create apisauce instance
export const api: ApisauceInstance = create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
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

// Add auth token interceptor
api.addRequestTransform((request: any) => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('access-token');
    if (token) {
      request.headers!['Authorization'] = `Bearer ${token}`;
    }
  }
});

// Add response interceptor for token refresh
api.addResponseTransform(async (response: any) => {
  if (response.status === 401 && !response.config._retry) {
    if (isRefreshing) {
      // Si un refresh est déjà en cours, attendre qu'il se termine
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        if (response.config && response.config.headers) {
          response.config.headers['Authorization'] = `Bearer ${token}`;
          return api.any(response.config);
        }
      }).catch(err => {
        throw err;
      });
    }

    if (response.config) {
      response.config._retry = true;
    }
    isRefreshing = true;

    try {
      const refreshToken = Cookies.get('refresh-token');
      if (refreshToken) {
        // Créer une nouvelle instance apisauce pour éviter l'intercepteur
        const refreshApi = create({
          baseURL: API_BASE_URL,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        
        const refreshResponse = await refreshApi.post('/auth/refresh');
        
        if (refreshResponse.ok && refreshResponse.data) {
          const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data as {
            accessToken: string;
            refreshToken: string;
          };
          
          // Mettre à jour les cookies
          Cookies.set('access-token', accessToken, { 
            expires: 1/24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          Cookies.set('refresh-token', newRefreshToken, { 
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
          
          processQueue(null, accessToken);
          
          // Retry original request avec le nouveau token
          if (response.config && response.config.headers) {
            response.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return api.any(response.config);
          }
        }
      }
    } catch (refreshError) {
      processQueue(refreshError, null);
      
      // Refresh failed, logout
      Cookies.remove('access-token');
      Cookies.remove('refresh-token');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
      
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  }
});

// Generic request handler
async function handleResponse<T>(response: ApiResponse<T>): Promise<T> {
  if (!response.ok) {
    const status = response.status || 500;
    const errorData = response.data as { message?: string } | undefined;
    const errorMessage = errorData?.message || response.problem || 'Unknown error';
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