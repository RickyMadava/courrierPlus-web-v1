import { cn } from "@/lib/utils";
import { Package, Truck, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface PackageCardProps {
  id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "delayed" | "cancelled";
  destination: string;
  sender: string;
  weight?: string;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  className?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800",
    label: "En attente"
  },
  processing: {
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    label: "En traitement"
  },
  shipped: {
    icon: Truck,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    label: "Expédié"
  },
  delivered: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    label: "Livré"
  },
  delayed: {
    icon: AlertCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    label: "Retardé"
  },
  cancelled: {
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    label: "Annulé"
  }
};

export function PackageCard({
  id,
  status,
  destination,
  sender,
  weight,
  estimatedDelivery,
  trackingNumber,
  className
}: PackageCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md",
      config.borderColor,
      className
    )}>
      {/* Status indicator stripe */}
      <div className={cn("absolute left-0 top-0 h-full w-1", config.bgColor)} />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("rounded-full p-1.5", config.bgColor)}>
            <Icon className={cn("h-4 w-4", config.color)} />
          </div>
          <div>
            <p className="text-sm font-semibold">#{id}</p>
            <p className={cn("text-xs font-medium", config.color)}>
              {config.label}
            </p>
          </div>
        </div>
        {trackingNumber && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Suivi</p>
            <p className="text-xs font-mono">{trackingNumber}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div>
          <p className="text-xs text-muted-foreground">Expéditeur</p>
          <p className="text-sm font-medium">{sender}</p>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground">Destination</p>
          <p className="text-sm font-medium">{destination}</p>
        </div>

        {weight && (
          <div>
            <p className="text-xs text-muted-foreground">Poids</p>
            <p className="text-sm">{weight}</p>
          </div>
        )}

        {estimatedDelivery && (
          <div>
            <p className="text-xs text-muted-foreground">Livraison estimée</p>
            <p className="text-sm">
              {estimatedDelivery.toLocaleDateString("fr-FR", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </p>
          </div>
        )}
      </div>

      {/* Progress indicator for shipped packages */}
      {status === "shipped" && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted rounded-full h-1.5">
              <div className="bg-primary rounded-full h-1.5 transition-all duration-500" style={{ width: "60%" }} />
            </div>
            <span className="text-xs text-muted-foreground">En route</span>
          </div>
        </div>
      )}
    </div>
  );
}