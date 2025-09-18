"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { setAuthLogoutCallback } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { logout, isAuthenticated } = useAuthStore();

  // Configure le callback de logout pour l'intercepteur API
  useEffect(() => {
    setAuthLogoutCallback(() => {
      logout();
    });
  }, [logout]);

  // Vérifie la cohérence entre localStorage et cookies au démarrage
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated) {
      // Vérifie si les cookies d'auth sont présents
      const hasAccessToken = document.cookie.includes('access-token');
      const hasRefreshToken = document.cookie.includes('refresh-token');
      
      // Si localStorage dit "connecté" mais pas de cookies, nettoie localStorage
      if (!hasAccessToken && !hasRefreshToken) {
        console.log('Auth state inconsistent: localStorage says authenticated but no auth cookies found. Cleaning up.');
        logout();
      }
    }
  }, [isAuthenticated, logout]);

  return <SessionProvider>{children}</SessionProvider>;
}