import React from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboard() {
  const stats = [
    { label: "Patients inscrits", value: 128, color: "bg-green-100 text-green-700" },
    { label: "Alertes actives", value: 7, color: "bg-red-100 text-red-700" },
    { label: "Recommandations", value: 24, color: "bg-blue-100 text-blue-700" },
    { label: "Discussions en cours", value: 3, color: "bg-purple-100 text-purple-700" }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Admin Dashboard</h1>
      <p className="mb-8 text-lg text-gray-700">
        Vue d'ensemble de l'activité de la plateforme : nombre de patients, alertes récentes, recommandations en attente, etc.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={idx} className={`rounded-xl p-6 shadow ${stat.color} flex flex-col items-center`}>
            <span className="text-4xl font-bold">{stat.value}</span>
            <span className="mt-2 text-lg">{stat.label}</span>
          </div>
        ))}
      </div>
      
      {/* Tu pourras ajouter ici des graphiques, listes d'alertes récentes, etc. */}
    </div>
  );
}