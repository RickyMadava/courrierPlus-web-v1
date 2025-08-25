'use client';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';

export function LogoutButton() {
  const { isAuthenticated, user } = useAuthStore();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success('Déconnexion réussie !');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Connecté en tant que <strong>{user.email}</strong>
      </span>
      <Button 
        onClick={handleLogout}
        variant="outline"
        disabled={logoutMutation.isPending}
      >
        {logoutMutation.isPending ? 'Déconnexion...' : 'Se déconnecter'}
      </Button>
    </div>
  );
}