import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { post } from '@/lib/api';
import { LoginRequest } from '@/types/auth';
import { useAuthStore } from '@/stores/auth-store';

interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: {
      id: string;
      name: string;
    };
  };
  message: string;
}

export function useLogin() {
  const router = useRouter();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      const response = await post<LoginResponse>('/auth/login', credentials);
      return response;
    },
    onSuccess: (data) => {
      console.log('Login successful, data:', data);
      
      // Update auth store with user data (cookies are handled automatically)
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        role: data.user.role.name,
      };
      
      console.log('Updating auth store with user:', user);
      login(user);

      // Redirect to dashboard after successful login
      console.log('Redirecting to dashboard...');
      
      // Try router.push first
      router.push('/dashboard');
      
      // Fallback: if router.push doesn't work, use window.location after a short delay
      setTimeout(() => {
        if (window.location.pathname === '/login') {
          console.log('Router push failed, using window.location as fallback');
          window.location.href = '/dashboard';
        }
      }, 500);
    },
    onError: (error) => {
      console.error('Sign in error:', error);
    },
  });
}