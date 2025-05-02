import React from "react";
import { Link } from "react-router-dom";
import EvolutionChart from "./EvolutionChart";

export default function UserDashboard() {
  // Ces valeurs peuvent venir d'une API plus tard
  const nutritionSummary = {
    calories: 1800,
    proteins: 70,
    carbs: 220,
    fats: 60,
    micronutrients: "Fer, Vitamine C, Potassium"
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Mon Tableau de Bord</h1>
      {/* Résumé nutritionnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Résumé nutritionnel</h2>
          <ul className="text-gray-700 space-y-1">
            <li>Calories : <span className="font-bold">{nutritionSummary.calories}</span> kcal</li>
            <li>Protéines : <span className="font-bold">{nutritionSummary.proteins}</span> g</li>
            <li>Glucides : <span className="font-bold">{nutritionSummary.carbs}</span> g</li>
            <li>Lipides : <span className="font-bold">{nutritionSummary.fats}</span> g</li>
            <li>Micronutriments : <span className="font-bold">{nutritionSummary.micronutrients}</span></li>
          </ul>
        </div>
        {/* Rappels de médicaments */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Rappels de médication</h2>
          <Link to="/dashboard/medications" className="text-green-600 hover:underline">
            Voir mes rappels
          </Link>
        </div>
      </div>
      {/* Journal alimentaire */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Mon journal alimentaire</h2>
        <Link to="/dashboard/journal" className="text-green-600 hover:underline">
          Accéder au journal
        </Link>
      </div>
      {/* Recommandations */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Recommandations personnalisées</h2>
        <Link to="/dashboard/recommandations" className="text-green-600 hover:underline">
          Voir mes recommandations
        </Link>
      </div>
      {/* Chat */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2">Chat avec l’administrateur</h2>
        <Link to="/dashboard/chat" className="text-green-600 hover:underline">
          Ouvrir le chat
        </Link>
      </div>
      {/* Courbe d’évolution (placeholder) */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-2">Évolution sur 7 jours</h2>
        <div className="h-40 flex items-center justify-center text-gray-400">
          {/* Ici tu pourras intégrer un graphique plus tard */}
          <span>Graphique à venir…</span>
        </div>
      </div>
    </div>
  );
}