"use client";

import { useAuthStore } from "@/stores/auth-store";
import React from "react";

export function UserInfo() {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Bienvenue, {user?.name || "Utilisateur"} !
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Rôle:</strong> {user?.role}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
          <p>
            <strong>Statut:</strong> Actif
          </p>
        </div>
      </div>
    </div>
  );
}
