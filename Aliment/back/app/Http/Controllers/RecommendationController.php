<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use App\Models\Patient;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    public function index(Patient $patient)
    {
        $recommendations = $patient->recommendations()->orderBy('created_at', 'desc')->get();
        return response()->json($recommendations);
    }

    public function store(Request $request, Patient $patient)
    {
        $request->validate([
            'food_recommendations' => 'required|string',
            'meal_plan' => 'required|string',
            'notes' => 'required|string',
        ]);

        $recommendation = $patient->recommendations()->create($request->all());

        return response()->json($recommendation, 201);
    }

    public function update(Request $request, Recommendation $recommendation)
    {
        $request->validate([
            'food_recommendations' => 'sometimes|string',
            'meal_plan' => 'sometimes|string',
            'notes' => 'sometimes|string',
        ]);

        $recommendation->update($request->all());

        return response()->json($recommendation);
    }

    public function destroy(Recommendation $recommendation)
    {
        $recommendation->delete();
        return response()->json(['message' => 'Recommendation deleted successfully']);
    }
} 