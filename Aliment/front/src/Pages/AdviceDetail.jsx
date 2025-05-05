export function AdviceDetail() {
    const { disease } = useParams();
    const location = useLocation();
    const { prevention, forbiddenFoods, recommendedFoods } = location.state || {};
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-green-800 mb-6"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux conseils
          </button>
  
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img 
                src={`https://source.unsplash.com/random/800x400/?${disease}`}
                alt={disease}
                className="w-full h-full object-cover"
              />
            </div>
  
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
                Conseils pour {disease.replace('-', ' ')}
              </h1>
  
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Mesures de Prévention
                  </h2>
                  <ul className="space-y-3 pl-2">
                    {prevention.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-2xl font-semibold text-red-600 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Aliments à Éviter
                  </h2>
                  <ul className="space-y-3 pl-2">
                    {forbiddenFoods.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
  
                <section>
                  <h2 className="text-2xl font-semibold text-green-600 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Aliments Recommandés
                  </h2>
                  <ul className="space-y-3 pl-2">
                    {recommendedFoods.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
  
              <div className="mt-12 bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">À retenir</h3>
                <p className="text-gray-700 mb-4">
                  Ces conseils ne remplacent pas un avis médical. Consultez toujours un professionnel de santé pour un accompagnement personnalisé.
                </p>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Prendre rendez-vous avec un spécialiste
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }