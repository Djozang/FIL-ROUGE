import { useState } from 'react';
import { PlusIcon, SearchIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';

export default function NutritionJournal() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMeal, setSelectedMeal] = useState('1');
    const [showAddFoodDialog, setShowAddFoodDialog] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [portion, setPortion] = useState('1');
    
    // Données nutritionnelles de l'utilisateur
    const [nutritionData, setNutritionData] = useState({
        calories: { consumed: 1450, target: 2000 },
        protein: { consumed: 75, target: 100 },
        carbs: { consumed: 180, target: 250 },
        fat: { consumed: 48, target: 70 }
    });

    // Liste des repas de la journée
    const [meals, setMeals] = useState([
        {
            id: '1',
            name: 'Petit déjeuner',
            time: '08:00',
            foods: [
                { id: '1', name: 'Yaourt nature', calories: 120, protein: 5, carbs: 9, fat: 8, portion: '1 pot' },
                { id: '2', name: 'Flocons d\'avoine', calories: 150, protein: 5, carbs: 27, fat: 3, portion: '40g' },
                { id: '3', name: 'Banane', calories: 105, protein: 1, carbs: 27, fat: 0, portion: '1 moyenne' }
            ]
        },
        {
            id: '2',
            name: 'Déjeuner',
            time: '12:30',
            foods: [
                { id: '4', name: 'Salade de quinoa', calories: 320, protein: 12, carbs: 40, fat: 10, portion: '1 bol' },
                { id: '5', name: 'Blanc de poulet', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
                { id: '6', name: 'Légumes grillés', calories: 90, protein: 3, carbs: 12, fat: 3, portion: '150g' }
            ]
        },
        {
            id: '3',
            name: 'Dîner',
            time: '19:30',
            foods: [
                { id: '7', name: 'Soupe de légumes', calories: 120, protein: 4, carbs: 20, fat: 2, portion: '1 bol' },
                { id: '8', name: 'Filet de saumon', calories: 220, protein: 22, carbs: 0, fat: 13, portion: '100g' },
                { id: '9', name: 'Riz complet', calories: 130, protein: 3, carbs: 28, fat: 1, portion: '80g' }
            ]
        },
        {
            id: '4',
            name: 'Collations',
            time: 'Toute la journée',
            foods: [
                { id: '10', name: 'Pomme', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, portion: '1 moyenne' },
                { id: '11', name: 'Amandes', calories: 160, protein: 6, carbs: 6, fat: 14, portion: '30g' }
            ]
        }
    ]);

    // Base de données d'aliments
    const foodDatabase = [
        { id: '101', name: 'Pomme', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, portion: '1 moyenne' },
        { id: '102', name: 'Banane', calories: 105, protein: 1, carbs: 27, fat: 0, portion: '1 moyenne' },
        { id: '103', name: 'Yaourt nature', calories: 120, protein: 5, carbs: 9, fat: 8, portion: '1 pot' },
        { id: '104', name: 'Œuf', calories: 70, protein: 6, carbs: 0, fat: 5, portion: '1 unité' },
        { id: '105', name: 'Pain complet', calories: 80, protein: 3, carbs: 15, fat: 1, portion: '1 tranche' },
        { id: '106', name: 'Riz blanc', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, portion: '100g cuit' },
        { id: '107', name: 'Poulet (blanc)', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100g' },
        { id: '108', name: 'Saumon', calories: 220, protein: 22, carbs: 0, fat: 13, portion: '100g' },
        { id: '109', name: 'Lentilles', calories: 115, protein: 9, carbs: 20, fat: 0.4, portion: '100g cuites' },
        { id: '110', name: 'Haricots rouges', calories: 120, protein: 8, carbs: 22, fat: 0.5, portion: '100g cuits', restricted: true, restrictionReason: 'Favisme' },
        { id: '111', name: 'Chocolat noir', calories: 170, protein: 2, carbs: 13, fat: 12, portion: '30g', restricted: true, restrictionReason: 'Diabète - Sucre élevé' },
        { id: '112', name: 'Fromage cheddar', calories: 110, protein: 7, carbs: 0.4, fat: 9, portion: '30g', restricted: true, restrictionReason: 'Hypertension - Sodium élevé' }
    ];

    // Filtrer les aliments
    const filteredFoods = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Ajouter un aliment à un repas
    const addFoodToMeal = () => {
        if (!selectedFood) return;

        const portionMultiplier = parseFloat(portion) || 1; 
        const adjustedFood = {
            ...selectedFood,
            calories: Math.round(selectedFood.calories * portionMultiplier),
            protein: Math.round(selectedFood.protein * portionMultiplier * 10) / 10,
            carbs: Math.round(selectedFood.carbs * portionMultiplier * 10) / 10,
            fat: Math.round(selectedFood.fat * portionMultiplier * 10) / 10,
            portion: `${portion} ${selectedFood.portion.split(' ').slice(1).join(' ')}`
        };

        setMeals(meals.map(meal => 
            meal.id === selectedMeal 
                ? { ...meal, foods: [...meal.foods, { ...adjustedFood, id: Date.now().toString() }] } 
                : meal
        ));

        setNutritionData({
            calories: {
                ...nutritionData.calories,
                consumed: nutritionData.calories.consumed + adjustedFood.calories
            },
            protein: {
                ...nutritionData.protein,
                consumed: nutritionData.protein.consumed + adjustedFood.protein
            },
            carbs: {
                ...nutritionData.carbs,
                consumed: nutritionData.carbs.consumed + adjustedFood.carbs
            },
            fat: {
                ...nutritionData.fat,
                consumed: nutritionData.fat.consumed + adjustedFood.fat
            }
        });

        setShowAddFoodDialog(false);
        setSelectedFood(null);
        setPortion('1');
    };

    // Supprimer un aliment
    const removeFood = (mealId, foodId) => {
        const meal = meals.find(m => m.id === mealId);
        if (!meal) return;

        const food = meal.foods.find(f => f.id === foodId);
        if (!food) return;

        setMeals(meals.map(meal => 
            meal.id === mealId 
                ? { ...meal, foods: meal.foods.filter(f => f.id !== foodId) } 
                : meal
        ));

        setNutritionData({
            calories: {
                ...nutritionData.calories,
                consumed: nutritionData.calories.consumed - food.calories
            },
            protein: {
                ...nutritionData.protein,
                consumed: nutritionData.protein.consumed - food.protein
            },
            carbs: {
                ...nutritionData.carbs,
                consumed: nutritionData.carbs.consumed - food.carbs
            },
            fat: {
                ...nutritionData.fat,
                consumed: nutritionData.fat.consumed - food.fat
            }
        });
    };

    // Calculer le pourcentage de progression
    const calculateProgress = (consumed, target) => {
        return Math.min(Math.round((consumed / target) * 100), 100);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Journal alimentaire</h1>
                <p className="text-gray-500">
                    Suivez votre alimentation quotidienne et recevez des recommandations personnalisées.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Résumé nutritionnel */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Résumé nutritionnel</h2>
                        <p className="text-sm text-gray-500">Votre consommation d'aujourd'hui</p>
                    </div>
                    <div className="space-y-4">
                        {Object.entries(nutritionData).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium capitalize">{key}</span>
                                    <span className="text-gray-500">
                                        {value.consumed} / {value.target} {key === 'calories' ? 'kcal' : 'g'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full" 
                                        style={{ width: `${calculateProgress(value.consumed, value.target)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommandations */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recommandations</h2>
                        <p className="text-sm text-gray-500">Basées sur votre profil et vos habitudes alimentaires</p>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <div className="flex items-start">
                                <InfoIcon className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-blue-800">Diabète</h3>
                                    <p className="text-sm text-blue-700">
                                        Privilégiez les aliments à faible indice glycémique comme les légumes verts, les légumineuses et les céréales complètes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-md p-3">
                            <div className="flex items-start">
                                <InfoIcon className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-green-800">Hydratation</h3>
                                    <p className="text-sm text-green-700">
                                        N'oubliez pas de boire au moins 2L d'eau par jour pour maintenir une bonne hydratation.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                            <div className="flex items-start">
                                <InfoIcon className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                                <div>
                                    <h3 className="text-sm font-medium text-yellow-800">Repas réguliers</h3>
                                    <p className="text-sm text-yellow-700">
                                        Pour stabiliser votre glycémie, essayez de manger à des heures régulières et évitez de sauter des repas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Journal des repas */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Journal des repas</h2>
                        <p className="text-sm text-gray-500">Enregistrez vos repas et collations de la journée</p>
                    </div>

                    {/* Onglets */}
                    <div className="mb-4">
                        <div className="grid grid-cols-4 gap-1 bg-gray-100 p-1 rounded-lg">
                            {meals.map(meal => (
                                <button
                                    key={meal.id}
                                    className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                        selectedMeal === meal.id 
                                            ? 'bg-white shadow text-blue-600' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                    onClick={() => setSelectedMeal(meal.id)}
                                >
                                    {meal.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenu des repas */}
                    {meals.map(meal => (
                        <div key={meal.id} className={`${selectedMeal === meal.id ? 'block' : 'hidden'}`}>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-900">{meal.name}</h3>
                                    <p className="text-sm text-gray-500">{meal.time}</p>
                                </div>
                                <button
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    onClick={() => {
                                        setShowAddFoodDialog(true);
                                        setSelectedMeal(meal.id);
                                    }}
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Ajouter un aliment
                                </button>
                            </div>

                            {meal.foods.length > 0 ? (
                                <div className="space-y-2">
                                    {meal.foods.map(food => (
                                        <div key={food.id} className="flex justify-between items-center p-3 border rounded-md">
                                            <div>
                                                <div className="font-medium flex items-center">
                                                    {food.name}
                                                    {food.restricted && (
                                                        <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
                                                            Déconseillé
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {food.portion} | {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | L: {food.fat}g
                                                </div>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                onClick={() => removeFood(meal.id, food.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center p-6 border-2 border-dashed rounded-md bg-gray-50">
                                    <p className="text-gray-500 mb-2">Aucun aliment enregistré pour ce repas</p>
                                    <button
                                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                                        onClick={() => {
                                            setShowAddFoodDialog(true);
                                            setSelectedMeal(meal.id);
                                        }}
                                    >
                                        <PlusIcon className="h-4 w-4 mr-1" />
                                        Ajouter un aliment
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-between border-t">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Réinitialiser le journal
                    </button>
                    <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        Enregistrer
                    </button>
                </div>
            </div>

            {/* Dialog pour ajouter un aliment */}
            {showAddFoodDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Ajouter un aliment</h3>
                                <button 
                                    onClick={() => setShowAddFoodDialog(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="food-search" className="block text-sm font-medium text-gray-700 mb-1">Rechercher un aliment</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="food-search"
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Ex: pomme, poulet, riz..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="border rounded-md max-h-60 overflow-y-auto">
                                    {filteredFoods.length > 0 ? (
                                        <ul className="divide-y">
                                            {filteredFoods.map(food => (
                                                <li 
                                                    key={food.id}
                                                    className={`p-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center ${
                                                        selectedFood?.id === food.id ? 'bg-gray-100' : ''
                                                    } ${food.restricted ? 'bg-red-50' : ''}`}
                                                    onClick={() => setSelectedFood(food)}
                                                >
                                                    <div>
                                                        <div className="font-medium">{food.name}</div>
                                                        <div className="text-sm text-gray-500">
                                                            {food.calories} kcal | P: {food.protein}g | C: {food.carbs}g | L: {food.fat}g
                                                        </div>
                                                    </div>
                                                    {food.restricted && (
                                                        <div className="text-red-500 flex items-center">
                                                            <AlertTriangleIcon className="h-4 w-4 mr-1" />
                                                            <span className="text-xs">Déconseillé</span>
                                                        </div>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="p-4 text-center text-gray-500">
                                            Aucun aliment trouvé
                                        </div>
                                    )}
                                </div>

                                {selectedFood && (
                                    <div className="space-y-2">
                                        <label htmlFor="portion" className="block text-sm font-medium text-gray-700">Portion</label>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                id="portion"
                                                min="0.25"
                                                step="0.25"
                                                value={portion}
                                                onChange={(e) => setPortion(e.target.value)}
                                                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <span className="text-sm text-gray-500">
                                                {selectedFood.portion.split(' ').slice(1).join(' ')}
                                            </span>
                                        </div>
                                        {selectedFood.restricted && (
                                            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <AlertTriangleIcon className="h-5 w-5 text-red-400" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-sm text-red-700 font-medium">Attention</p>
                                                        <p className="text-sm text-red-700">
                                                            Cet aliment n'est pas recommandé pour votre condition: {selectedFood.restrictionReason}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddFoodDialog(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    onClick={addFoodToMeal}
                                    disabled={!selectedFood}
                                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                        !selectedFood ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}