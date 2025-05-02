import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Suppose que tu utilises un contexte AuthContext pour l'utilisateur connecté


export default function AdminRoute() {
  const { user } = useAuth();

  // Si l'utilisateur n'est pas connecté ou n'est pas admin, on le redirige
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Sinon, on affiche la route enfant (layout + page admin)
  return <Outlet />;
}