import React from "react";

export default function Diseases() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Maladies et Explications</h1>
      <p className="mb-8 text-lg text-gray-700">
        Informez-vous sur les maladies les plus courantes et découvrez comment une alimentation adaptée peut améliorer votre quotidien.
      </p>
      <div className="space-y-6">
        <div>
         <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl opacity-0 animate-fade-in"
        style={{ animationFillMode: "forwards" }}/>
          <h2 className="text-xl font-semibold text-gray-800">Paludisme</h2>
          <p className="text-gray-600">Le paludisme est une maladie parasitaire transmise par les moustiques. Une alimentation équilibrée aide à renforcer le système immunitaire.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Cancer du foie</h2>
          <p className="text-gray-600">Le cancer du foie nécessite une alimentation pauvre en graisses et riche en fruits et légumes pour soutenir le foie.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Cancer du sein</h2>
          <p className="text-gray-600">Une alimentation riche en fibres et pauvre en sucres rapides est recommandée pour les personnes atteintes de cancer du sein.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Diabète</h2>
          <p className="text-gray-600">Le diabète nécessite un contrôle strict de la consommation de sucres et une alimentation équilibrée.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Hypertension artérielle</h2>
          <p className="text-gray-600">Limiter le sel et privilégier les aliments riches en potassium est essentiel pour l’hypertension.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Favisme</h2>
          <p className="text-gray-600">Le favisme impose d’éviter certains aliments comme les fèves et les légumineuses pour prévenir les crises.</p>
        </div>
      </div>
    </div>
  );
}