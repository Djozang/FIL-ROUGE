<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'food_recommendations',
        'meal_plan',
        'notes'
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
} 