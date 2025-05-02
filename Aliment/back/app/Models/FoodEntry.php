<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'meal_type',
        'food_items',
        'calories',
        'macronutrients',
        'micronutrients'
    ];

    protected $casts = [
        'food_items' => 'array',
        'macronutrients' => 'array',
        'micronutrients' => 'array'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
} 