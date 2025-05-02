<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disease extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'symptoms',
        'prevention',
        'treatment',
        'restricted_foods',
        'recommended_foods'
    ];

    protected $casts = [
        'restricted_foods' => 'array',
        'recommended_foods' => 'array'
    ];
} 