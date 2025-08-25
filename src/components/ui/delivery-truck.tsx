import { cn } from "@/lib/utils";
import { Truck, Package, MapPin, Clock } from "lucide-react";

interface DeliveryTruckProps {
  id: string;
  driver: string;
  currentLocation: string;
  packagesCount: number;
  nextDelivery?: string;
  status: "idle" | "on-route" | "delivering" | "maintenance";
  capacity?: number;
  className?: string;
}

const statusConfig = {
  idle: {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "Disponible"
  },
  "on-route": {
    color: "text-primary",
    bgColor: "bg-primary/10",
    label: "En route"
  },
  delivering: {
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    label: "En livraison"
  },
  maintenance: {
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    label: "Maintenance"
  }
};

export function DeliveryTruck({
  id,
  driver,
  currentLocation,
  packagesCount,
  nextDelivery,
  status,
  capacity = 100,
  className
}: DeliveryTruckProps) {
  const config = statusConfig[status];
  const utilizationPercentage = capacity > 0 ? (packagesCount / capacity) * 100 : 0;

  return (
    <div className={cn(
      "rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      {/* Header with truck icon and status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("rounded-full p-2", config.bgColor)}>
            <Truck className={cn("h-5 w-5", config.color)} />
          </div>
          <div>
            <p className="font-semibold">Camion #{id}</p>
            <p className={cn("text-sm font-medium", config.color)}>
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Driver info */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Chauffeur</p>
          <p className="text-sm font-medium">{driver}</p>
        </div>

        {/* Current location */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs text-muted-foreground">Position actuelle</p>
            <p className="text-sm">{currentLocation}</p>
          </div>
        </div>

        {/* Next delivery */}
        {nextDelivery && status !== "idle" && (
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Prochaine livraison</p>
              <p className="text-sm">{nextDelivery}</p>
            </div>
          </div>
        )}

        {/* Package count and capacity */}
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Colis</p>
              <p className="text-xs text-muted-foreground">
                {packagesCount}/{capacity}
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  utilizationPercentage > 90 ? "bg-red-500" :
                  utilizationPercentage > 70 ? "bg-orange-500" :
                  utilizationPercentage > 50 ? "bg-yellow-500" :
                  "bg-green-500"
                )}
                style={{ width: `${Math.min(utilizationPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status-specific animations */}
        {status === "on-route" && (
          <div className="flex items-center gap-2 text-xs text-primary">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
            </div>
            <span>En déplacement...</span>
          </div>
        )}

        {status === "delivering" && (
          <div className="flex items-center gap-2 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Livraison en cours...</span>
          </div>
        )}
      </div>
    </div>
  );
}