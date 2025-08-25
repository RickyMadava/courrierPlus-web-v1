import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User, accessToken: string, refreshToken: string) => {
        Cookies.set('access-token', accessToken, { 
          expires: 1/24, // 1 heure
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('refresh-token', refreshToken, { 
          expires: 7, // 7 jours
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove('access-token');
        Cookies.remove('refresh-token');
        set({ user: null, isAuthenticated: false });
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      updateTokens: (accessToken: string, refreshToken: string) => {
        Cookies.set('access-token', accessToken, { 
          expires: 1/24,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        Cookies.set('refresh-token', refreshToken, { 
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);