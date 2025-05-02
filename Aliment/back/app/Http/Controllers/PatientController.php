<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::with('user')->get();
        return response()->json($patients);
    }

    public function show(Patient $patient)
    {
        return response()->json($patient->load('user'));
    }

    public function update(Request $request, Patient $patient)
    {
        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $patient->user_id,
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|string',
            'condition_medicale' => 'string',
            'blood_type' => 'nullable|string',
            'medical_history' => 'nullable|string',
            'allergies' => 'nullable|string',
        ]);

        if ($request->has('name') || $request->has('email')) {
            $patient->user->update($request->only(['name', 'email']));
        }

        $patient->update($request->except(['name', 'email']));

        return response()->json($patient->load('user'));
    }

    public function destroy(Patient $patient)
    {
        $patient->user->delete();
        return response()->json(['message' => 'Patient deleted successfully']);
    }
} 