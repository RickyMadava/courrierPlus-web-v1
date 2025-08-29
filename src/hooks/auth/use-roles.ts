import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import { Role } from "@/types/auth";

export function useRoles() {
  return useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: async (): Promise<Role[]> => {
      const response = await get<Role[]>("/roles");
      return response;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: 3, // Retry 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
