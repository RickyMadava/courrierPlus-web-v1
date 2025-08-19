import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/types';
import { useAuthStore } from '@/stores/auth-store';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>('/auth/profile');
    return response.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  },
};

export const useLogin = () => {
  const { login } = useAuthStore();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};

export const useRegister = () => {
  const { login } = useAuthStore();
  
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      login(data.user, data.token);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthStore();
  
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
    },
  });
};

export const useProfile = () => {
  const { isAuthenticated } = useAuthStore();
  
  return useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: isAuthenticated,
  });
};