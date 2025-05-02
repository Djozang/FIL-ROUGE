<?php

namespace App\Http\Controllers;

use App\Models\FoodEntry;
use App\Models\Patient;
use Illuminate\Http\Request;

class FoodEntryController extends Controller
{
    public function index(Patient $patient)
    {
        $foodEntries = $patient->foodEntries;
        return response()->json($foodEntries);
    }

    public function store(Request $request, Patient $patient)
    {
        $request->validate([
            'meal_type' => 'required|string|in:breakfast,lunch,dinner,snack',
            'food_items' => 'required|array',
            'calories' => 'required|integer',
            'macronutrients' => 'required|array',
            'micronutrients' => 'nullable|array',
        ]);

        $foodEntry = $patient->foodEntries()->create($request->all());

        // Vérifier les restrictions alimentaires et créer une alerte si nécessaire
        $this->checkFoodRestrictions($patient, $foodEntry);

        return response()->json($foodEntry, 201);
    }

    public function update(Request $request, FoodEntry $foodEntry)
    {
        $request->validate([
            'meal_type' => 'sometimes|string|in:breakfast,lunch,dinner,snack',
            'food_items' => 'sometimes|array',
            'calories' => 'sometimes|integer',
            'macronutrients' => 'sometimes|array',
            'micronutrients' => 'nullable|array',
        ]);

        $foodEntry->update($request->all());

        // Vérifier à nouveau les restrictions alimentaires
        $this->checkFoodRestrictions($foodEntry->patient, $foodEntry);

        return response()->json($foodEntry);
    }

    public function destroy(FoodEntry $foodEntry)
    {
        $foodEntry->delete();
        return response()->json(['message' => 'Food entry deleted successfully']);
    }

    private function checkFoodRestrictions(Patient $patient, FoodEntry $foodEntry)
    {
        // Implémenter la logique de vérification des restrictions alimentaires
        // en fonction des maladies du patient
        // Créer des alertes si nécessaire
    }
} 