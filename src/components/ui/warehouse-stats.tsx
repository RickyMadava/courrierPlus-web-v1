import { cn } from "@/lib/utils";
import { Package, Truck, Users, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ElementType;
  className?: string;
}

function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  const getTrendIcon = () => {
    switch (change?.trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getTrendColor = () => {
    switch (change?.trend) {
      case "up":
        return "text-green-600 bg-green-50 dark:bg-green-950/20";
      case "down":
        return "text-red-600 bg-red-50 dark:bg-red-950/20";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className={cn(
      "rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            getTrendColor()
          )}>
            {getTrendIcon()}
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface WarehouseStatsProps {
  stats: {
    totalPackages: number;
    packagesChange?: { value: number; trend: "up" | "down" | "neutral" };
    activeTrucks: number;
    trucksChange?: { value: number; trend: "up" | "down" | "neutral" };
    activeWorkers: number;
    workersChange?: { value: number; trend: "up" | "down" | "neutral" };
    deliveryRate: number;
    deliveryRateChange?: { value: number; trend: "up" | "down" | "neutral" };
  };
  className?: string;
}

export function WarehouseStats({ stats, className }: WarehouseStatsProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      <StatCard
        title="Colis totaux"
        value={stats.totalPackages.toLocaleString()}
        change={stats.packagesChange}
        icon={Package}
      />
      
      <StatCard
        title="Camions actifs"
        value={stats.activeTrucks}
        change={stats.trucksChange}
        icon={Truck}
      />
      
      <StatCard
        title="Employés actifs"
        value={stats.activeWorkers}
        change={stats.workersChange}
        icon={Users}
      />
      
      <StatCard
        title="Taux de livraison"
        value={`${stats.deliveryRate}%`}
        change={stats.deliveryRateChange}
        icon={TrendingUp}
      />
    </div>
  );
}

// Warehouse activity heatmap component
interface ActivityHeatmapProps {
  data: Array<{
    hour: number;
    activity: "low" | "medium" | "high" | "peak";
    packages: number;
  }>;
  className?: string;
}

export function ActivityHeatmap({ data, className }: ActivityHeatmapProps) {
  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "low":
        return "bg-muted";
      case "medium":
        return "bg-primary/30";
      case "high":
        return "bg-primary/60";
      case "peak":
        return "bg-primary";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className={cn("rounded-lg border bg-card p-4", className)}>
      <h3 className="font-semibold mb-4">Activité de l'entrepôt (24h)</h3>
      <div className="grid grid-cols-12 gap-1">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <div
              className={cn(
                "rounded h-8 mb-1 transition-all hover:scale-110",
                getActivityColor(item.activity)
              )}
              title={`${item.hour}h - ${item.packages} colis`}
            />
            <span className="text-xs text-muted-foreground">
              {item.hour}h
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
        <span>Faible</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-muted rounded"></div>
          <div className="w-3 h-3 bg-primary/30 rounded"></div>
          <div className="w-3 h-3 bg-primary/60 rounded"></div>
          <div className="w-3 h-3 bg-primary rounded"></div>
        </div>
        <span>Élevée</span>
      </div>
    </div>
  );
}