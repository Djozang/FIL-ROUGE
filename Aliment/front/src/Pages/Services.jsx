import React from "react";
//import { ServicesPage } from "./pages/ServicesPage";

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Nos Services</h1>
      <p className="mb-8 text-lg text-gray-700">
        Découvrez comment notre application vous accompagne au quotidien pour un meilleur suivi alimentaire et une santé optimale.
      </p>
      <ul className="list-disc pl-6 space-y-4 text-gray-600">
        <li>Suivi nutritionnel personnalisé</li>
        <li>Gestion des restrictions alimentaires</li>
        <li>Rappels de médication</li>
        <li>Recommandations adaptées à votre état de santé</li>
        <li>Support et chat avec un administrateur</li>
      </ul>
    </div>
  );
}