import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { LoginRequest } from '@/types/auth';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const result = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      // Redirect to dashboard/users page after successful login
      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      console.error('Sign in error:', error);
      // Error handling is managed by the form component
      // You could also add toast notifications here if needed
    },
  });
}