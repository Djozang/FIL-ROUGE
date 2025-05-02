import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Apple, Heart, Activity, Clock } from 'lucide-react';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prenez soin de votre santé grâce à une alimentation adaptée
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Notre application vous aide à suivre votre alimentation en fonction de vos besoins spécifiques, qu'ils soient liés à l'âge, à une maladie ou à des restrictions alimentaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
                >
                  S'inscrire
                </Link>
                <Link 
                  to="/login" 
                  className="border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition-colors"
                >
                  Se connecter
                </Link>
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg text-center transition-colors"
                >
                  Visiter le site
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/placeholder.svg?height=400&width=500" 
                alt="Suivi alimentaire" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>



      {/* Modal for site visitors */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h3 className="text-2xl font-bold mb-4">Bienvenue sur notre site</h3>
            <p className="mb-6">
              Vous pouvez explorer notre site pour en savoir plus sur nos services et nos conseils nutritionnels.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Fermer
              </button>
              <Link 
                to="/accueil" 
                onClick={() => setShowModal(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
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