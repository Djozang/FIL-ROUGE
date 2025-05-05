import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight, Apple, Heart, Activity, Clock } from 'lucide-react';


function accueil() {
    
  const features = [
    {
      icon: <Apple className="h-10 w-10 text-green-500" />,
      title: "Suivi Nutritionnel Personnalisé",
      description: "Suivez votre alimentation quotidienne et recevez des recommandations adaptées à votre état de santé."
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: "Gestion des Restrictions Alimentaires",
      description: "Recevez des alertes lorsque vous consommez des aliments contre-indiqués pour votre condition médicale."
    },
    {
      icon: <Activity className="h-10 w-10 text-blue-500" />,
      title: "Suivi de Votre Évolution",
      description: "Visualisez votre progression et vos habitudes alimentaires sur des graphiques clairs et intuitifs."
    },
    {
      icon: <Clock className="h-10 w-10 text-purple-500" />,
      title: "Rappels de Médication",
      description: "Ne manquez plus jamais une prise de médicament grâce à notre système de rappels personnalisés."
    }
  ];

  const testimonials = [
    {
      name: "Lori Love.",
      age: 45,
      condition: "Favisme",
      quote: "Grâce à cette application, je gère beaucoup mieux mon diabète. Les alertes m'aident à éviter les aliments trop sucrés."
    },
    {
      name: "Vinny.",
      age: 52,
      condition: "Hypertension",
      quote: "Les recommandations alimentaires m'ont permis de réduire ma tension artérielle de façon naturelle. Je me sens beaucoup mieux !"
    },
    {
      name: "Bamilonaise.",
      age: 75,
      condition: "Diabète de type 2",
      quote: "L'application m'alerte immédiatement quand je risque de consommer des aliments dangereux pour ma condition. C'est rassurant !"
    }
  ];
  return (
    <div>

         {/* Hero Section */}
         <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prenez soin de votre santé grâce à une alimentation adaptée
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Cette application vous aide à suivre votre alimentation en fonction de vos besoins spécifiques, que ce soit pour la gestion du poids, le diabète, les allergies ou d'autres conditions de santé.
              </p>
              </div>
              </div>
              </div>
             </section>
              
       {/* Features Section */}
       <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir notre application ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="border-none shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold mr-3">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}, {testimonial.age} ans</p>
                      <p className="text-sm text-gray-500">{testimonial.condition}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à améliorer votre santé ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez notre communauté et commencez à prendre soin de votre alimentation dès aujourd'hui.
          </p>
          <Link 
            to="/register" 
            className="bg-white text-green-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg inline-flex items-center transition-colors"
          >
            Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default accueil
