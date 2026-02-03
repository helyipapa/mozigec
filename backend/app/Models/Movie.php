<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'description',
        'poster_url',
        'age_rating',
        'status',
        'duration',
        'genre',
        'release_date'
    ];

    protected $casts = [
        'release_date' => 'date',
    ];

    public function showtimes(): HasMany
    {
        return $this->hasMany(Showtime::class);
    }
}
