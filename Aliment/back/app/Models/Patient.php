<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date_of_birth',
        'gender',
        'condition_medicale',
        'blood_type',
        'medical_history',
        'allergies'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function medications()
    {
        return $this->hasMany(Medication::class);
    }

    public function foodEntries()
    {
        return $this->hasMany(FoodEntry::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }
} 