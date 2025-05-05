import React from "react";

export default function ServicesPage() {
  const services = [
    {
      title: "Suivi nutritionnel personnalisé",
      icon: "🍎",
      description: "Notre système analyse vos habitudes alimentaires et vous fournit des statistiques détaillées sur votre apport nutritionnel. Obtenez des graphiques clairs sur votre consommation de calories, protéines, glucides et lipides, avec des comparaisons par rapport à vos objectifs personnels.",
      benefits: [
        "Analyse quotidienne de votre alimentation",
        "Visualisation graphique de vos progrès",
        "Recommandations basées sur vos carences",
        "Suivi des macros et micronutriments"
      ]
    },
    {
      title: "Gestion des restrictions alimentaires",
      icon: "🚫",
      description: "Que vous suiviez un régime spécifique (sans gluten, végétarien, keto...) ou que vous ayez des allergies, notre application adapte ses recommandations en conséquence. Scannez les codes-barres des produits pour vérifier instantanément leur compatibilité avec vos restrictions.",
      benefits: [
        "Base de données de produits avec filtres intelligents",
        "Alertes immédiates sur les incompatibilités",
        "Suggestions d'alternatives adaptées",
        "Carnet d'allergies partageable avec les professionnels de santé"
      ]
    },
    {
      title: "Rappels de médication",
      icon: "⏰",
      description: "Plus jamais d'oubli de prise médicamenteuse grâce à notre système de rappels intelligents. Configurez des alertes personnalisées pour chaque médicament, avec la possibilité d'ajouter des notes sur les effets secondaires ou les instructions particulières.",
      benefits: [
        "Programmation de rappels récurrents",
        "Suivi de l'historique des prises",
        "Alertes pour les renouvellements d'ordonnance",
        "Interface simplifiée pour les personnes âgées"
      ]
    },
    {
      title: "Recommandations santé adaptées",
      icon: "💡",
      description: "En fonction de votre profil santé, de vos objectifs et de vos données historiques, notre moteur d'intelligence artificielle génère des conseils personnalisés. Ces recommandations évoluent avec vous et tiennent compte des dernières recherches nutritionnelles.",
      benefits: [
        "Plans alimentaires sur mesure",
        "Conseils en fonction des saisons",
        "Suggestions d'activités physiques complémentaires",
        "Alertes sur les interactions aliments-médicaments"
      ]
    },
    {
      title: "Support personnalisé",
      icon: "👩‍⚕️",
      description: "Bénéficiez d'un accès privilégié à notre équipe de nutritionnistes et professionnels de santé via notre chat sécurisé. Posez vos questions, partagez vos doutes et recevez des réponses éclairées en moins de 24 heures.",
      benefits: [
        "Messagerie cryptée pour la confidentialité",
        "Possibilité d'envoyer des photos de repas pour analyse",
        "Rendez-vous virtuels avec des spécialistes",
        "Bibliothèque de ressources personnalisées"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-green-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Nos Services Complets
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            Découvrez comment notre application révolutionne votre approche de la santé et du bien-être
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-green-100 flex items-center justify-center p-8 md:p-12">
                  <span className="text-6xl">{service.icon}</span>
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
                    Service {index + 1}
                  </div>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-lg text-gray-600">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-green-700">Bénéfices clés :</h3>
                    <ul className="mt-2 space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-2 text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-green-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-8 py-12 md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-white">
                Prêt à transformer votre santé ?
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Rejoignez des milliers d'utilisateurs satisfaits et prenez le contrôle de votre bien-être dès aujourd'hui.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <button className="px-6 py-3 bg-white rounded-lg text-green-800 font-bold text-lg hover:bg-green-100 transition duration-300 transform hover:scale-105">
                Commencer maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/*import React from "react";
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
*/