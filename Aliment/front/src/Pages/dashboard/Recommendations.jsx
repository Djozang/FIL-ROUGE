import React from "react";
import { ThumbsUp, AlertTriangle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext"; // Adjust the path based on your project structure


const recommendations = [
  {
    id: 1,
    title: "Évitez les aliments riches en sucre",
    description: "Si vous êtes diabétique, limitez la consommation de sucre, sodas, pâtisseries et privilégiez les aliments à index glycémique bas.",
    category: "meal",
    tags: ["Diabète", "Sucre"],
    importance: "high"
  },
  {
    id: 2,
    title: "Privilégiez les fruits frais le soir",
    description: "Pour une collation saine, choisissez des fruits frais adaptés à votre condition.",
    category: "meal",
    tags: ["Collation", "Fruits"],
    importance: "medium"
  },
  {
    id: 3,
    title: "Évitez les fèves si vous souffrez de favisme",
    description: "Le favisme impose d'éviter certains aliments comme les fèves, haricots et pois chiches.",
    category: "meal",
    tags: ["Favisme", "Légumineuses"],
    importance: "high"
  }
];

export default function Recommendations() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Recommandations Personnalisées</h1>
      <div className="space-y-4">
        {recommendations.map(rec => (
          <div key={rec.id} className="bg-green-50 border-l-4 border-green-600 p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <ThumbsUp className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-semibold text-green-800">{rec.title}</span>
              {rec.importance === "high" && (
                <div className="ml-2 bg-red-600 text-white">Important</div>
              )}
            </div>
            <div className="text-gray-700 mb-2">{rec.description}</div>
            <div className="flex flex-wrap gap-2">
              {rec.tags.map(tag => (
                <div key={tag} className="bg-green-200 text-green-800">{tag}</div>
              ))}
            </div>
          </div>
        ))}
        {/* Exemple d'alerte */}
        {user && user.condition === "favism" && (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Attention</AlertTitle>
            <AlertDescription>
              Certains aliments sont strictement interdits pour votre condition (favisme). Veuillez consulter la liste des aliments à éviter.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
