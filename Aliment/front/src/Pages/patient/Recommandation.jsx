import React from "react";

const recommendations = [
  {
    id: 1,
    message: "Évitez les aliments riches en sucre si vous êtes diabétique.",
    for: "Diabète"
  },
  {
    id: 2,
    message: "Privilégiez les fruits frais pour la collation du soir.",
    for: "Tous"
  },
  {
    id: 3,
    message: "Évitez les fèves si vous souffrez de favisme.",
    for: "Favisme"
  }
];

export default function Recommandation() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Recommandations Personnalisées</h1>
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-green-50 border-l-4 border-green-600 p-4 rounded shadow">
            <div className="font-semibold text-green-800">{rec.for}</div>
            <div className="text-gray-700">{rec.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}