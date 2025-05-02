<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\FoodEntryController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Patients
    Route::get('/patients', [PatientController::class, 'index']);
    Route::get('/patients/{patient}', [PatientController::class, 'show']);
    Route::put('/patients/{patient}', [PatientController::class, 'update']);
    Route::delete('/patients/{patient}', [PatientController::class, 'destroy']);
    
    // Médicaments
    Route::get('/patients/{patient}/medications', [MedicationController::class, 'index']);
    Route::post('/patients/{patient}/medications', [MedicationController::class, 'store']);
    Route::put('/medications/{medication}', [MedicationController::class, 'update']);
    Route::delete('/medications/{medication}', [MedicationController::class, 'destroy']);
    
    // Entrées alimentaires
    Route::get('/patients/{patient}/food-entries', [FoodEntryController::class, 'index']);
    Route::post('/patients/{patient}/food-entries', [FoodEntryController::class, 'store']);
    Route::put('/food-entries/{foodEntry}', [FoodEntryController::class, 'update']);
    Route::delete('/food-entries/{foodEntry}', [FoodEntryController::class, 'destroy']);
    
    // Alertes
    Route::get('/patients/{patient}/alerts', [AlertController::class, 'index']);
    Route::post('/patients/{patient}/alerts', [AlertController::class, 'store']);
    Route::put('/alerts/{alert}/read', [AlertController::class, 'markAsRead']);
    Route::delete('/alerts/{alert}', [AlertController::class, 'destroy']);
    
    // Recommandations
    Route::get('/patients/{patient}/recommendations', [RecommendationController::class, 'index']);
    Route::post('/patients/{patient}/recommendations', [RecommendationController::class, 'store']);
    Route::put('/recommendations/{recommendation}', [RecommendationController::class, 'update']);
    Route::delete('/recommendations/{recommendation}', [RecommendationController::class, 'destroy']);
    
    // Chat
    Route::get('/chats', [ChatController::class, 'index']);
    Route::post('/chats', [ChatController::class, 'store']);
    Route::put('/chats/{chat}/read', [ChatController::class, 'markAsRead']);
    Route::get('/chats/conversation/{user}', [ChatController::class, 'getConversation']);
});
