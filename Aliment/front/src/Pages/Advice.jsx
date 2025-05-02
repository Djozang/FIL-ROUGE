import React from "react";

export default function Advice() {
  const adviceItems = [
    {
      title: "Prévention du paludisme",
      content: "Dormez sous une moustiquaire, évitez les eaux stagnantes et adoptez une alimentation riche en vitamines pour renforcer vos défenses.",
      delay: 0.2
    },
    {
      title: "Aliments à éviter en cas de favisme",
      content: "Évitez les fèves, pois chiches, et certains médicaments. Privilégiez les fruits et légumes frais.",
      delay: 0.3
    },
    {
      title: "Conseils pour l'hypertension",
      content: "Réduisez le sel, évitez les aliments transformés et consommez plus de fruits et légumes.",
      delay: 0.4
    }
    // Vous pouvez ajouter d'autres articles ici
  ];

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-purple-700">Conseils & Blog</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Retrouvez ici des conseils pratiques, des articles et des recommandations pour mieux vivre avec votre maladie ou prévenir certains risques.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {adviceItems.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg opacity-0 animate-fade-in"
            style={{ 
              animationDelay: `${item.delay}s`, 
              animationFillMode: "forwards" 
            }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h2>
            <p className="text-gray-600 flex-grow">{item.content}</p>
            <button className="mt-4 self-end text-purple-600 hover:text-purple-800 font-medium transition-colors">
              Lire plus →
            </button>
          </div>
        ))}
      </div>

      {/* Style pour l'animation fade-in */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}