import React, { useState } from "react";

/*const initialMeals = [
  { id: 1, type: "Petit-déjeuner", foods: "Pain, lait, banane", calories: 350 },
  { id: 2, type: "Déjeuner", foods: "Riz, poisson, légumes", calories: 600 },
  { id: 3, type: "Dîner", foods: "Bouillie, fruits", calories: 400 }
];

export default function NutritionJournal() {
  const [meals, setMeals] = useState(initialMeals);
  const [form, setForm] = useState({ type: "", foods: "", calories: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddMeal = e => {
    e.preventDefault();
    if (!form.type || !form.foods || !form.calories) return;
    setMeals([
      ...meals,
      { id: Date.now(), ...form, calories: Number(form.calories) }
    ]);
    setForm({ type: "", foods: "", calories: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Mon Journal Alimentaire</h1>
      <form onSubmit={handleAddMeal} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Type de repas</option>
          <option value="Petit-déjeuner">Petit-déjeuner</option>
          <option value="Déjeuner">Déjeuner</option>
          <option value="Dîner">Dîner</option>
        </select>
        <input name="foods"value={form.foods}onChange={handleChange}className="border rounded p-2"placeholder="Aliments consommés"required/>
        <input name="calories"value={form.calories}onChange={handleChange}className="border rounded p-2"placeholder="Calories"type="number"min="0"required/>
        <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
          Ajouter
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Aliments</th>
              <th className="py-2 px-4 border-b">Calories</th>
            </tr>
          </thead>
          <tbody>
            {meals.map(meal => (
              <tr key={meal.id}>
                <td className="py-2 px-4 border-b">{meal.type}</td>
                <td className="py-2 px-4 border-b">{meal.foods}</td>
                <td className="py-2 px-4 border-b">{meal.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>*/


// Exemple de restrictions selon la maladie
const forbiddenFoods = {
  "Favisme": ["fève", "haricot", "pois chiche"],
  "Diabète": ["sucre", "soda", "pâtisserie"]
};
const userDisease = "Favisme"; // À remplacer par la vraie maladie du patient

const initialMeals = [
  { id: 1, type: "Petit-déjeuner", foods: "Pain, lait, banane", calories: 350 },
  { id: 2, type: "Déjeuner", foods: "Riz, poisson, légumes", calories: 600 }
];

export default function NutritionJournal() {
  const [meals, setMeals] = useState(initialMeals);
  const [form, setForm] = useState({ type: "", foods: "", calories: "" });
  const [alert, setAlert] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddMeal = e => {
    e.preventDefault();
    if (!form.type || !form.foods || !form.calories) return;

    // Vérification des aliments interdits
    const forbidden = forbiddenFoods[userDisease]?.find(food =>
      form.foods.toLowerCase().includes(food)
    );
    if (forbidden) {
      setAlert(`Attention : "${forbidden}" est interdit pour votre maladie (${userDisease}) !`);
    } else {
      setAlert("");
    }

    setMeals([
      ...meals,
      { id: Date.now(), ...form, calories: Number(form.calories) }
    ]);
    setForm({ type: "", foods: "", calories: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Mon Journal Alimentaire</h1>
      {alert && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-600 text-red-800 rounded">
          {alert}
        </div>
      )}
      <form onSubmit={handleAddMeal} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded p-2"
          required
        >
          <option value="">Type de repas</option>
          <option value="Petit-déjeuner">Petit-déjeuner</option>
          <option value="Déjeuner">Déjeuner</option>
          <option value="Dîner">Dîner</option>
        </select>
        <input
          name="foods"
          value={form.foods}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="Aliments consommés"
          required
        />
        <input
          name="calories"
          value={form.calories}
          onChange={handleChange}
          className="border rounded p-2"
          placeholder="Calories"
          type="number"
          min="0"
          required
        />
        <button type="submit" className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
          Ajouter
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Aliments</th>
              <th className="py-2 px-4 border-b">Calories</th>
            </tr>
          </thead>
          <tbody>
            {meals.map(meal => (
              <tr key={meal.id}>
                <td className="py-2 px-4 border-b">{meal.type}</td>
                <td className="py-2 px-4 border-b">{meal.foods}</td>
                <td className="py-2 px-4 border-b">{meal.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

  

  