"use client";

import {
  PackageCard,
  DeliveryTruck,
  WarehouseStats,
  ActivityHeatmap,
  LogisticsGrid,
  LoadingDock,
  WorkerTeam,
  ConveyorBelt
} from "@/components/ui";

// Données d'exemple pour la démonstration
const mockPackages = [
  {
    id: "CP2024-001",
    status: "shipped" as const,
    destination: "Paris 75001",
    sender: "Entrepôt Lyon",
    weight: "2.5kg",
    estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000),
    trackingNumber: "1Z999AA1234567890"
  },
  {
    id: "CP2024-002", 
    status: "delivered" as const,
    destination: "Marseille 13000",
    sender: "Entrepôt Rungis",
    weight: "1.2kg",
    estimatedDelivery: new Date(),
    trackingNumber: "1Z999AA1234567891"
  },
  {
    id: "CP2024-003",
    status: "delayed" as const,
    destination: "Lyon 69000",
    sender: "Entrepôt Lille",
    weight: "3.8kg",
    estimatedDelivery: new Date(Date.now() + 48 * 60 * 60 * 1000),
    trackingNumber: "1Z999AA1234567892"
  }
];

const mockTrucks = [
  {
    id: "T001",
    driver: "Jean Dupont",
    currentLocation: "Autoroute A6 - Sortie Lyon",
    packagesCount: 45,
    capacity: 100,
    status: "on-route" as const,
    nextDelivery: "14:30 - Rue de la Paix"
  },
  {
    id: "T002",
    driver: "Marie Martin",
    currentLocation: "Entrepôt Central",
    packagesCount: 0,
    capacity: 100,
    status: "idle" as const
  },
  {
    id: "T003",
    driver: "Pierre Durand",
    currentLocation: "Zone de livraison - Centre ville",
    packagesCount: 78,
    capacity: 100,
    status: "delivering" as const,
    nextDelivery: "Livraison en cours"
  }
];

const mockStats = {
  totalPackages: 1234,
  packagesChange: { value: 12, trend: "up" as const },
  activeTrucks: 8,
  trucksChange: { value: 2, trend: "up" as const },
  activeWorkers: 25,
  workersChange: { value: 5, trend: "neutral" as const },
  deliveryRate: 94,
  deliveryRateChange: { value: 3, trend: "up" as const }
};

const mockWorkers = [
  {
    id: "W001",
    name: "Sophie Leblanc",
    role: "warehouse" as const,
    status: "active" as const,
    badgeNumber: "W015",
    currentTask: "Préparation commande #CP2024-567"
  },
  {
    id: "W002", 
    name: "Marc Rousseau",
    role: "driver" as const,
    status: "busy" as const,
    badgeNumber: "D008",
    currentTask: "Livraison secteur Nord"
  },
  {
    id: "W003",
    name: "Claire Moreau",
    role: "supervisor" as const,
    status: "active" as const,
    badgeNumber: "S003"
  }
];

const mockActivityData = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  activity: ["low", "medium", "high", "peak"][Math.floor(Math.random() * 4)] as "low" | "medium" | "high" | "peak",
  packages: Math.floor(Math.random() * 100) + 10
}));

export function LogisticsShowcase() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">CourierPlus Design System</h1>
        <p className="text-lg text-muted-foreground">
          Composants UI inspirés de l'univers logistique et de l'entrepôt
        </p>
      </div>

      {/* Statistiques d'entrepôt */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Statistiques d'Entrepôt</h2>
        <WarehouseStats stats={mockStats} />
      </section>

      {/* Heatmap d'activité */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Activité sur 24h</h2>
        <ActivityHeatmap data={mockActivityData} />
      </section>

      {/* Zone de chargement avec camions */}
      <LoadingDock 
        title="Flotte de Livraison"
        dockNumber={1}
        status="loading"
      >
        <LogisticsGrid variant="dashboard">
          {mockTrucks.map((truck) => (
            <DeliveryTruck key={truck.id} {...truck} />
          ))}
        </LogisticsGrid>
      </LoadingDock>

      {/* Tapis roulant de colis */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Tapis Roulant - Colis en Transit</h2>
        <ConveyorBelt direction="horizontal" speed="normal">
          {mockPackages.map((pkg) => (
            <div key={pkg.id} className="flex-shrink-0 w-80">
              <PackageCard {...pkg} />
            </div>
          ))}
        </ConveyorBelt>
      </section>

      {/* Équipe d'entrepôt */}
      <LoadingDock
        title="Équipe Active"
        dockNumber={2}
        status="available"
      >
        <WorkerTeam 
          workers={mockWorkers}
          title="Employés de Service"
          layout="list"
        />
      </LoadingDock>

      {/* Grille de colis */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Gestion des Colis</h2>
        <LogisticsGrid variant="warehouse">
          {mockPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
          
          {/* Ajout de colis supplémentaires pour la démo */}
          <PackageCard
            id="CP2024-004"
            status="processing"
            destination="Nice 06000"
            sender="Entrepôt Paris"
            weight="0.8kg"
            estimatedDelivery={new Date(Date.now() + 12 * 60 * 60 * 1000)}
          />
          
          <PackageCard
            id="CP2024-005"
            status="pending"
            destination="Toulouse 31000"
            sender="Entrepôt Bordeaux"
            weight="5.2kg"
            estimatedDelivery={new Date(Date.now() + 36 * 60 * 60 * 1000)}
          />
          
          <PackageCard
            id="CP2024-006"
            status="cancelled"
            destination="Strasbourg 67000"
            sender="Entrepôt Nancy"
            weight="2.1kg"
          />
        </LogisticsGrid>
      </section>

      {/* Palette de couleurs */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Palette de Couleurs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Primaire (Camions)</h3>
            <div className="bg-primary h-16 rounded-lg"></div>
            <p className="text-sm text-muted-foreground">oklch(0.52 0.20 240)</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Secondaire (Équipement)</h3>
            <div className="bg-secondary h-16 rounded-lg"></div>
            <p className="text-sm text-muted-foreground">oklch(0.65 0.22 50)</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Succès (Livré)</h3>
            <div className="bg-green-600 h-16 rounded-lg"></div>
            <p className="text-sm text-muted-foreground">oklch(0.65 0.15 140)</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Attention (Retardé)</h3>
            <div className="bg-orange-600 h-16 rounded-lg"></div>
            <p className="text-sm text-muted-foreground">oklch(0.68 0.20 40)</p>
          </div>
        </div>
      </section>
    </div>
  );
}