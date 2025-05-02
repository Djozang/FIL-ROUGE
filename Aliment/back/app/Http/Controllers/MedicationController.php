<?php

namespace App\Http\Controllers;

use App\Models\Medication;
use App\Models\Patient;
use Illuminate\Http\Request;

class MedicationController extends Controller
{
    public function index(Patient $patient)
    {
        $medications = $patient->medications;
        return response()->json($medications);
    }

    public function store(Request $request, Patient $patient)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|date_format:H:i',
        ]);

        $medication = $patient->medications()->create($request->all());

        return response()->json($medication, 201);
    }

    public function update(Request $request, Medication $medication)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'time' => 'sometimes|date_format:H:i',
            'status' => 'sometimes|in:pending,taken',
        ]);

        $medication->update($request->all());

        return response()->json($medication);
    }

    public function destroy(Medication $medication)
    {
        $medication->delete();
        return response()->json(['message' => 'Medication deleted successfully']);
    }
} 