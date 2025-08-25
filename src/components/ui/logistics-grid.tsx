import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LogisticsGridProps {
  children: ReactNode;
  variant?: "warehouse" | "dashboard" | "compact";
  className?: string;
}

export function LogisticsGrid({ 
  children, 
  variant = "warehouse", 
  className 
}: LogisticsGridProps) {
  const gridClasses = {
    warehouse: "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    dashboard: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
    compact: "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={cn(gridClasses[variant], className)}>
      {children}
    </div>
  );
}

// Conveyor Belt inspired layout component
interface ConveyorBeltProps {
  children: ReactNode;
  direction?: "horizontal" | "vertical";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export function ConveyorBelt({ 
  children, 
  direction = "horizontal", 
  speed = "normal",
  className 
}: ConveyorBeltProps) {
  const speedClasses = {
    slow: "animate-pulse duration-3000",
    normal: "animate-pulse duration-2000", 
    fast: "animate-pulse duration-1000"
  };

  const directionClasses = {
    horizontal: "flex gap-4 overflow-x-auto pb-4",
    vertical: "flex flex-col gap-4 overflow-y-auto max-h-96"
  };

  return (
    <div className={cn(
      directionClasses[direction],
      "relative",
      className
    )}>
      {/* Conveyor belt track effect */}
      <div className={cn(
        "absolute inset-0 border-2 border-dashed border-muted-foreground/20 rounded-lg",
        speedClasses[speed]
      )} />
      {children}
    </div>
  );
}

// Loading dock inspired section
interface LoadingDockProps {
  title: string;
  children: ReactNode;
  dockNumber?: number;
  status?: "available" | "loading" | "unloading" | "maintenance";
  className?: string;
}

export function LoadingDock({ 
  title, 
  children, 
  dockNumber,
  status = "available",
  className 
}: LoadingDockProps) {
  const statusConfig = {
    available: {
      color: "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/10",
      indicator: "bg-green-500"
    },
    loading: {
      color: "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/10",
      indicator: "bg-blue-500 animate-pulse"
    },
    unloading: {
      color: "border-orange-200 dark:border-orange-800 bg-orange-50/50 dark:bg-orange-950/10", 
      indicator: "bg-orange-500 animate-pulse"
    },
    maintenance: {
      color: "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/10",
      indicator: "bg-red-500"
    }
  };

  const config = statusConfig[status];

  return (
    <section className={cn(
      "relative rounded-lg border-2 p-6",
      config.color,
      className
    )}>
      {/* Dock number and status indicator */}
      <div className="flex items-center gap-3 mb-4">
        {dockNumber && (
          <div className="flex items-center gap-2">
            <div className="bg-muted text-muted-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {dockNumber}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", config.indicator)} />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      </div>
      
      {/* Loading dock gate effect */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-muted via-muted-foreground/30 to-muted rounded-full" />
        <div className="pt-4">
          {children}
        </div>
      </div>
    </section>
  );
}

// Warehouse aisle layout
interface WarehouseAisleProps {
  aisleNumber: string;
  children: ReactNode;
  className?: string;
}

export function WarehouseAisle({ aisleNumber, children, className }: WarehouseAisleProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Aisle marker */}
      <div className="absolute -left-8 top-0 bottom-0 w-6 bg-primary/10 rounded-r-lg flex items-center justify-center">
        <span className="text-xs font-bold text-primary transform -rotate-90 whitespace-nowrap">
          ALLÉE {aisleNumber}
        </span>
      </div>
      
      {/* Aisle content */}
      <div className="ml-2 space-y-4">
        {children}
      </div>
      
      {/* Floor marking lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent" />
    </div>
  );
}