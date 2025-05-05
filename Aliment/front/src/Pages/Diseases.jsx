import React from "react";

const diseasesData = [
  {
    id: 1,
    name: "Paludisme",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    definition: "Le paludisme est une maladie infectieuse potentiellement mortelle causée par des parasites du genre Plasmodium, transmis à l'homme par les piqûres de moustiques Anophèles infectés.",
    effects: [
      "Fièvre élevée et frissons",
      "Maux de tête intenses",
      "Nausées et vomissements",
      "Douleurs musculaires et fatigue",
      "Anémie sévère dans les cas chroniques",
      "Complications cérébrales (paludisme cérébral)"
    ],
    trigger: "Le parasite Plasmodium (principalement P. falciparum, P. vivax, P. ovale, P. malariae et P. knowlesi) transmis par la piqûre du moustique Anophèle femelle.",
    dietaryTips: "Une alimentation riche en fer (pour combattre l'anémie), en vitamine C (pour renforcer l'immunité) et une hydratation abondante sont recommandées."
  },
  {
    id: 2,
    name: "Cancer du foie",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    definition: "Le cancer du foie est une tumeur maligne qui se développe aux dépens des cellules hépatiques (hépatocarcinome) ou des voies biliaires intrahépatiques (cholangiocarcinome).",
    effects: [
      "Perte de poids involontaire",
      "Perte d'appétit",
      "Douleurs abdominales hautes",
      "Nausées et vomissements",
      "Jaunisse (ictère)",
      "Ascite (accumulation de liquide dans l'abdomen)"
    ],
    trigger: "Les principaux facteurs de risque sont les infections chroniques par les virus de l'hépatite B ou C, la cirrhose, la stéatose hépatique non alcoolique, la consommation excessive d'alcool et l'exposition à certaines toxines comme l'aflatoxine.",
    dietaryTips: "Une alimentation pauvre en graisses saturées, riche en fruits et légumes (antioxydants), avec des protéines de haute qualité et des céréales complètes est recommandée pour soutenir la fonction hépatique."
  },
  {
    id: 3,
    name: "Cancer du sein",
    image: "https://images.unsplash.com/photo-1631217877850-8a4d5399ab4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    definition: "Le cancer du sein est une tumeur maligne qui se développe à partir des cellules mammaires, principalement dans les canaux galactophores ou les lobules.",
    effects: [
      "Masse ou épaississement dans le sein",
      "Modification de la taille ou de la forme du sein",
      "Modifications de la peau du sein (peau d'orange)",
      "Rétraction du mamelon",
      "Écoulement mamelonnaire",
      "Ganglion axillaire dur et indolore"
    ],
    trigger: "Facteurs hormonaux (exposition prolongée aux œstrogènes), génétiques (mutations BRCA1/BRCA2), obésité post-ménopausique, consommation d'alcool, sédentarité et exposition aux radiations.",
    dietaryTips: "Une alimentation riche en fibres (céréales complètes, légumes), pauvre en sucres rapides et en graisses saturées, avec des apports suffisants en oméga-3 (poissons gras) et phytoestrogènes (soja) peut être bénéfique."
  },
  {
    id: 4,
    name: "Diabète",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    definition: "Le diabète est une maladie chronique caractérisée par une hyperglycémie résultant d'une insuffisance de production ou d'utilisation de l'insuline.",
    effects: [
      "Soif intense (polydipsie)",
      "Mictions fréquentes (polyurie)",
      "Faim excessive (polyphagie)",
      "Fatigue et irritabilité",
      "Cicatrisation lente des plaies",
      "Infections fréquentes",
      "Complications à long terme (rétinopathie, néphropathie, neuropathie)"
    ],
    trigger: "Pour le diabète de type 1: réaction auto-immune détruisant les cellules β pancréatiques. Pour le type 2: résistance à l'insuline combinée à une insuffisance relative de sécrétion d'insuline, souvent liée à l'obésité, la sédentarité et des facteurs génétiques.",
    dietaryTips: "Contrôle strict des glucides (index glycémique bas), repas équilibrés avec fibres, protéines maigres et bonnes graisses. Éviter les sucres rapides et privilégier les légumes, céréales complètes et légumineuses."
  },
  {
    id: 5,
    name: "Hypertension artérielle",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    definition: "L'hypertension artérielle est une élévation anormale de la pression du sang dans les artères, définie par des valeurs ≥140 mmHg (systolique) et/ou ≥90 mmHg (diastolique).",
    effects: [
      "Souvent asymptomatique (tueur silencieux)",
      "Maux de tête matinaux",
      "Vertiges",
      "Saignements de nez",
      "Essoufflement",
      "Complications graves (AVC, infarctus, insuffisance rénale, rétinopathie)"
    ],
    trigger: "Facteurs non modifiables (âge, génétique) et modifiables: obésité, consommation excessive de sel, sédentarité, stress, alcool, tabac. Certaines maladies (rein, endocriniennes) peuvent aussi causer une hypertension secondaire.",
    dietaryTips: "Régime DASH (riche en fruits, légumes, produits laitiers pauvres en gras), réduction drastique du sel, apports suffisants en potassium (bananes, épinards), magnésium et calcium. Limiter alcool et caféine."
  },
  {
    id: 6,
    name: "Favisme",
    image: "https://images.unsplash.com/photo-1566566221559-4b908ad0d7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    definition: "Le favisme est un déficit enzymatique héréditaire en glucose-6-phosphate déshydrogénase (G6PD) qui provoque une destruction des globules rouges (hémolyse) lors de l'exposition à certains aliments ou médicaments.",
    effects: [
      "Crise hémolytique aiguë après exposition",
      "Fatigue et pâleur (anémie)",
      "Ictère (jaunisse)",
      "Urines foncées (hémoglobinurie)",
      "Douleurs abdominales",
      "Tachycardie et essoufflement",
      "Dans les cas graves: insuffisance rénale aiguë"
    ],
    trigger: "Déficit en enzyme G6PD (génétique, lié au chromosome X). Facteurs déclenchants: fèves et légumineuses (d'où le nom favisme), certains médicaments (antipaludéens, sulfamides, aspirine à haute dose), infections sévères.",
    dietaryTips: "Éviter strictement les fèves et produits dérivés, les légumineuses dans certains cas. Privilégier une alimentation équilibrée avec viandes maigres, céréales, fruits et légumes (sauf ceux à risque). Bien s'hydrater."
  }
];

export default function Diseases() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Maladies et Explications Détaillées
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez les maladies courantes, leurs causes, leurs effets et comment une alimentation adaptée peut jouer un rôle clé dans leur prévention et gestion.
          </p>
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diseasesData.map((disease) => (
            <div 
              key={disease.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Disease Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={disease.image} 
                  alt={disease.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Disease Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{disease.name}</h2>
                
                {/* Definition */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-green-600 mb-1">Définition</h3>
                  <p className="text-gray-600">{disease.definition}</p>
                </div>

                {/* Effects */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-red-600 mb-1">Effets et Symptômes</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {disease.effects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>

                {/* Trigger */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-purple-600 mb-1">Acteur Déclencheur</h3>
                  <p className="text-gray-600">{disease.trigger}</p>
                </div>

                {/* Dietary Tips */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-600 mb-1">Conseils Alimentaires</h3>
                  <p className="text-gray-700">{disease.dietaryTips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-blue-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">En Savoir Plus</h2>
          <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
            Pour des informations plus détaillées sur ces maladies et des conseils nutritionnels personnalisés, consultez un professionnel de santé.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300">
            Trouver un spécialiste
          </button>
        </div>
      </div>
    </div>
  );
}



/*import React from "react";

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
*/