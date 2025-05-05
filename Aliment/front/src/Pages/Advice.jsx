import React from "react";
import { useNavigate } from "react-router-dom";

const adviceData = [
  {
    id: 1,
    title: "Prévention du Paludisme",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Découvrez comment protéger votre famille contre le paludisme avec des mesures préventives efficaces et une alimentation adaptée.",
    disease: "paludisme",
    delay: 0.1
  },
  {
    id: 2,
    title: "Gestion du Diabète au Quotidien",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    excerpt: "Apprenez à équilibrer votre glycémie grâce à des choix alimentaires judicieux et des habitudes de vie saines.",
    disease: "diabete",
    delay: 0.2
  },
  {
    id: 3,
    title: "Aliments à éviter avec le Favisme",
    image: "https://images.unsplash.com/photo-1566566221559-4b908ad0d7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Liste complète des aliments et médicaments dangereux pour les personnes atteintes de favisme.",
    disease: "favisme",
    delay: 0.3
  },
  {
    id: 4,
    title: "Protéger son Foie au Quotidien",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Conseils nutritionnels pour prévenir les maladies hépatiques et soutenir la fonction de votre foie.",
    disease: "cancer-du-foie",
    delay: 0.4
  },
  {
    id: 5,
    title: "Régime contre l'Hypertension",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Découvrez le régime DASH et les aliments à privilégier pour faire baisser naturellement votre tension artérielle.",
    disease: "hypertension",
    delay: 0.5
  },
  {
    id: 6,
    title: "Prévention du Cancer du Sein",
    image: "https://images.unsplash.com/photo-1631217877850-8a4d5399ab4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    excerpt: "Facteurs de risque modifiables et alimentation préventive pour réduire les risques de cancer du sein.",
    disease: "cancer-du-sein",
    delay: 0.6
  }
];

const diseaseDetails = {
  paludisme: {
    prevention: [
      "Utilisation systématique de moustiquaires imprégnées d'insecticide",
      "Pulvérisation intradomiciliaire d'insecticides à effet rémanent",
      "Port de vêtements couvrants (manches longues, pantalons) en soirée",
      "Utilisation de répulsifs cutanés (DEET, IR3535, icaridine)",
      "Élimination des gîtes larvaires (eaux stagnantes autour des habitations)",
      "Chimiothérapie préventive pour les voyageurs en zone endémique"
    ],
    forbiddenFoods: [
      "Alcools forts (affaiblissent le système immunitaire)",
      "Excès de caféine (peut aggraver la déshydratation)",
      "Aliments trop gras ou frits (difficiles à digérer pendant la maladie)",
      "Sucres rapides en excès (peuvent nourrir le parasite)"
    ],
    recommendedFoods: [
      "Aliments riches en fer (viandes maigres, légumes verts) contre l'anémie",
      "Fruits riches en vitamine C (agrumes, goyave) pour renforcer l'immunité",
      "Ail (propriétés antipaludéennes potentielles)",
      "Curcuma (anti-inflammatoire naturel)",
      "Hydratation abondante (eau, bouillons, tisanes)"
    ]
  },
  // Ajoutez les autres maladies avec les mêmes détails...
};

export default function Advice() {
  const navigate = useNavigate();

  const handleReadMore = (disease) => {
    navigate(`/advice/${disease}`, { state: diseaseDetails[disease] });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Conseils & Blog Santé
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre guide complet pour prévenir et mieux vivre avec les maladies chroniques. Découvrez des conseils pratiques validés par des experts.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Rechercher un conseil..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition">
              Tous
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Prévention
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Nutrition
            </button>
          </div>
        </div>

        {/* Advice Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {adviceData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-green-100 text-blue-800 text-sm font-medium rounded-full">
                    {item.disease.replace('-', ' ')}
                  </span>
                  <span className="text-sm text-gray-500">5 min read</span>
                </div>

                <h2 className="text-xl font-bold text-green-800 mb-3">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>

                <button
                  onClick={() => handleReadMore(item.disease)}
                  className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
                >
                  Lire l'article complet
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        

        <div className="mt-16 bg-blue-200 from-purple-500 to-green-100 rounded-xl p-8 text-center text-while">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Restez informé</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir chaque semaine des conseils santé exclusifs directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="px-6 py-3 bg-white text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

