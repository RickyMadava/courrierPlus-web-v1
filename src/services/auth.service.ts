import { useMutation } from '@tanstack/react-query';
import { post } from '@/lib/api';
import { LoginResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export const authService = {
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    return await post<LoginResponse>('/auth/register', userData);
  },
};

export const useLogout = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      await post('/auth/logout', {});
    },
    onSuccess: () => {
      // Clear auth store
      logout();
      
      // Redirect to login page
      router.push('/login');
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      logout();
      router.push('/login');
    },
  });
};