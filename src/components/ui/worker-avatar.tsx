import { cn } from "@/lib/utils";
import { User, Badge, Clock, CheckCircle } from "lucide-react";

interface WorkerAvatarProps {
  name: string;
  role: "driver" | "warehouse" | "supervisor" | "admin";
  status: "active" | "break" | "offline" | "busy";
  avatar?: string;
  badgeNumber?: string;
  currentTask?: string;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  className?: string;
}

const roleConfig = {
  driver: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    label: "Chauffeur"
  },
  warehouse: {
    color: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    label: "Magasinier"
  },
  supervisor: {
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    label: "Superviseur"
  },
  admin: {
    color: "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300",
    label: "Administrateur"
  }
};

const statusConfig = {
  active: {
    color: "bg-green-500",
    label: "Actif"
  },
  break: {
    color: "bg-yellow-500",
    label: "Pause"
  },
  offline: {
    color: "bg-gray-400",
    label: "Hors ligne"
  },
  busy: {
    color: "bg-red-500 animate-pulse",
    label: "Occupé"
  }
};

const sizeConfig = {
  sm: {
    avatar: "w-8 h-8",
    text: "text-xs",
    badge: "text-xs px-1.5 py-0.5"
  },
  md: {
    avatar: "w-10 h-10",
    text: "text-sm",
    badge: "text-xs px-2 py-1"
  },
  lg: {
    avatar: "w-12 h-12", 
    text: "text-base",
    badge: "text-sm px-3 py-1"
  }
};

export function WorkerAvatar({
  name,
  role,
  status,
  avatar,
  badgeNumber,
  currentTask,
  size = "md",
  showDetails = false,
  className
}: WorkerAvatarProps) {
  const roleConf = roleConfig[role];
  const statusConf = statusConfig[status];
  const sizeConf = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Avatar with status indicator */}
      <div className="relative">
        <div className={cn(
          "rounded-full bg-muted flex items-center justify-center overflow-hidden",
          sizeConf.avatar
        )}>
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-1/2 h-1/2 text-muted-foreground" />
          )}
        </div>
        
        {/* Status indicator */}
        <div className={cn(
          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
          statusConf.color
        )} />
        
        {/* Badge number for warehouse workers */}
        {badgeNumber && (
          <div className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {badgeNumber}
          </div>
        )}
      </div>

      {/* Worker details */}
      {showDetails && (
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className={cn("font-medium truncate", sizeConf.text)}>{name}</p>
            <span className={cn(
              "rounded-full px-2 py-0.5 font-medium",
              roleConf.color,
              sizeConf.badge
            )}>
              {roleConf.label}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", statusConf.color)} />
            <span className={cn("text-muted-foreground", sizeConf.text)}>
              {statusConf.label}
            </span>
          </div>
          
          {/* Current task */}
          {currentTask && status === "busy" && (
            <div className="flex items-center gap-1 mt-1">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className={cn("text-muted-foreground truncate", sizeConf.text)}>
                {currentTask}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Team display component
interface WorkerTeamProps {
  workers: Array<{
    id: string;
    name: string;
    role: "driver" | "warehouse" | "supervisor" | "admin";
    status: "active" | "break" | "offline" | "busy";
    avatar?: string;
    badgeNumber?: string;
    currentTask?: string;
  }>;
  title?: string;
  maxDisplay?: number;
  size?: "sm" | "md" | "lg";
  layout?: "list" | "grid" | "inline";
  className?: string;
}

export function WorkerTeam({ 
  workers, 
  title,
  maxDisplay = 5,
  size = "md",
  layout = "list",
  className 
}: WorkerTeamProps) {
  const displayedWorkers = workers.slice(0, maxDisplay);
  const remainingCount = workers.length - maxDisplay;

  const layoutClasses = {
    list: "space-y-3",
    grid: "grid grid-cols-2 gap-3",
    inline: "flex flex-wrap gap-2"
  };

  return (
    <div className={cn("", className)}>
      {title && (
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          {title}
          <span className="text-muted-foreground text-sm">
            ({workers.length})
          </span>
        </h3>
      )}
      
      <div className={layoutClasses[layout]}>
        {displayedWorkers.map((worker) => (
          <WorkerAvatar
            key={worker.id}
            name={worker.name}
            role={worker.role}
            status={worker.status}
            avatar={worker.avatar}
            badgeNumber={worker.badgeNumber}
            currentTask={worker.currentTask}
            size={size}
            showDetails={layout !== "inline"}
          />
        ))}
        
        {remainingCount > 0 && layout === "inline" && (
          <div className={cn(
            "rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium",
            sizeConfig[size].avatar
          )}>
            +{remainingCount}
          </div>
        )}
      </div>
      
      {remainingCount > 0 && layout !== "inline" && (
        <p className="text-sm text-muted-foreground mt-2">
          Et {remainingCount} autres employé{remainingCount > 1 ? "s" : ""}...
        </p>
      )}
    </div>
  );
}