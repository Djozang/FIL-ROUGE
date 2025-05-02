<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use App\Models\Patient;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function index(Patient $patient)
    {
        $alerts = $patient->alerts()->orderBy('created_at', 'desc')->get();
        return response()->json($alerts);
    }

    public function store(Request $request, Patient $patient)
    {
        $request->validate([
            'type' => 'required|string|in:food,medication,general',
            'message' => 'required|string',
        ]);

        $alert = $patient->alerts()->create($request->all());

        return response()->json($alert, 201);
    }

    public function markAsRead(Alert $alert)
    {
        $alert->update(['is_read' => true]);
        return response()->json($alert);
    }

    public function destroy(Alert $alert)
    {
        $alert->delete();
        return response()->json(['message' => 'Alert deleted successfully']);
    }
} 