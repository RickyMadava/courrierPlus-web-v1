import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

// Fonction utilitaire pour extraire le rôle de façon sécurisée
function getRoleName(role: any): string {
  if (typeof role === 'string') return role;
  if (typeof role === 'object' && role !== null) {
    return role.name || 'Unknown';
  }
  return 'Unknown';
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <LogoutButton />
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bienvenue, {session.user.firstName || ''} {session.user.lastName || ''} !</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Rôle:</strong> {getRoleName(session.user.role)}</p>
              {session.user.phone && <p><strong>Téléphone:</strong> {session.user.phone}</p>}
            </div>
            <div className="space-y-2">
              <p><strong>ID:</strong> {session.user.id}</p>
              <p><strong>Statut:</strong> {session.user.isActive ? 'Actif' : 'Inactif'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Nouveau courrier</h4>
              <p className="text-sm text-gray-600">Créer un nouveau courrier</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Mes courriers</h4>
              <p className="text-sm text-gray-600">Voir tous mes courriers</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium">Statistiques</h4>
              <p className="text-sm text-gray-600">Voir les statistiques</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}