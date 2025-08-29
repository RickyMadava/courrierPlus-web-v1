import { LogoutButton } from "@/components/auth/logout-button";
import { UserInfo } from "@/components/dashboard/user-info";
import { requireAuth } from "@/lib/auth-guard";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <LogoutButton />
        </div>

        <UserInfo />

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
