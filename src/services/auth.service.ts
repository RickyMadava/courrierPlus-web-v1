import { useMutation } from '@tanstack/react-query';
import { post } from '@/lib/api';
import { LoginResponse, LoginRequest, RegisterRequest } from '@/types/auth';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const authService = {
  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    return await post<LoginResponse>('/auth/register', userData);
  },
};

export const useLogin = () => {
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
      router.push('/dashboard'); // Rediriger vers le dashboard après connexion
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: async (data) => {
      // Après inscription réussie, connecter automatiquement
      const result = await signIn('credentials', {
        email: data.user.email,
        password: '', // Le mot de passe n'est pas retourné par l'API
        redirect: false,
      });
      
      if (!result?.error) {
        window.location.href = '/dashboard';
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: async () => {
      await signOut({ 
        redirect: false // Ne pas rediriger automatiquement
      });
    },
    onSuccess: () => {
      router.push('/'); // Rediriger vers la page d'accueil après déconnexion
    },
  });
};