import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Apple, Heart, Activity, Clock } from 'lucide-react';
import Ali from "../assets/ali.png";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Prenez soin de votre santé <br />
                <span className="text-green-600">grâce à une alimentation adaptée</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Notre application vous accompagne pour adapter votre alimentation à vos besoins spécifiques : 
                gestion du poids, diabète, allergies ou autres conditions de santé.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  to="/register" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg text-center transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  S'inscrire <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-8 rounded-lg text-center transition-all duration-300 flex items-center justify-center"
                >
                  Se connecter
                </Link>
              </div>
              
              <button 
                onClick={() => setShowModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mt-4 transition-all"
              >
                <Clock size={18} /> Visiter le site sans compte
              </button>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src={Ali} 
                  alt="Personne heureuse avec une alimentation saine" 
                  className="rounded-xl shadow-2xl w-full max-w-lg mx-auto border-8 border-white transform hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
                  <div className="flex items-center gap-2">
                    <Heart className="text-red-500 fill-red-500" size={24} />
                    <span className="font-semibold">+500 utilisateurs satisfaits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nos fonctionnalités</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Apple className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Suivi nutritionnel</h3>
              <p className="text-gray-600">
                Analysez vos apports nutritionnels et recevez des recommandations personnalisées.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Activity className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Objectifs santé</h3>
              <p className="text-gray-600">
                Définissez et suivez vos objectifs de santé avec des plans adaptés.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Allergies & restrictions</h3>
              <p className="text-gray-600">
                Gérez vos allergies et restrictions alimentaires en toute simplicité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Bienvenue visiteur !</h3>
            <p className="mb-6 text-gray-700">
              Explorez notre site pour découvrir nos services et conseils nutritionnels sans créer de compte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setShowModal(false)}
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-lg transition-all flex-1"
              >
                Fermer
              </button>
              <Link 
                to="/accueil" 
                onClick={() => setShowModal(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex-1 text-center"
              >
                Explorer le site
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}