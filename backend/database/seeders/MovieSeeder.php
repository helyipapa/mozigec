<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;
use App\Models\Showtime;

class MovieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = [
            [
                'title' => 'Legénybúcsú',
                'description' => 'Alex és Simon mindketten háziorvosok és huszonegy éve elválaszthatatlanok. Most azonban Simon megnősül, így legjobb barátja egy igazán emlékezetes legénybúcsút szervez számára.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/430/poster_216x320.jpg',
                'age_rating' => 12,
                'status' => 'current',
                'duration' => 95,
                'genre' => 'Vígjáték',
                'showtimes' => [
                    ['showtime' => now()->addDays(0)->setTime(17, 0), 'hall' => 'M', 'format' => '2D']
                ]
            ],
            [
                'title' => '28 évvel később: A csonttemplom',
                'description' => 'A világtól elzárt, fertőző zombihordák uralta Angliában még élnek kis embercsoportok, akiknek sikerült megvédeniük magukat.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/450/poster_216x320.jpg',
                'age_rating' => 16,
                'status' => 'current',
                'duration' => 110,
                'genre' => 'Horror',
                'showtimes' => [
                    ['showtime' => now()->addDays(0)->setTime(19, 30), 'hall' => 'M', 'format' => '2D']
                ]
            ],
            [
                'title' => 'SpongyaBob: Kalózkaland',
                'description' => 'SpongeBob és Patrick a legjobb barátok, akik újabb kalandra indulnak.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/439/poster_216x320.jpg',
                'age_rating' => 0,
                'status' => 'current',
                'duration' => 90,
                'genre' => 'Animációs',
                'showtimes' => []
            ],
            [
                'title' => 'Magyar menyegző',
                'description' => 'Romantikus vígjáték egy igazi magyar esküvőről.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/436/poster_216x320.jpg',
                'age_rating' => 12,
                'status' => 'current',
                'duration' => 100,
                'genre' => 'Romantikus vígjáték'
            ],
            [
                'title' => 'Zootropolis 2.',
                'description' => 'Az animációs film folytatása, ahol állatok élnek együtt egy modern városban.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/446/poster_216x320.jpg',
                'age_rating' => 0,
                'status' => 'current',
                'duration' => 105,
                'genre' => 'Animációs'
            ],
            [
                'title' => 'Sikoly 7.',
                'description' => 'A klasszikus horror franchise hetedik része.',
                'poster_url' => 'https://szabadsagmozi.hu/cache/images/458/poster_216x320.jpg',
                'age_rating' => 18,
                'status' => 'coming_soon',
                'duration' => 120,
                'genre' => 'Horror'
            ],
            [
                'title' => 'Star Wars: A mandalóri és Grogu',
                'description' => 'Az új Star Wars film a Mandalorianról és Groguról.',
                'poster_url' => 'https://via.placeholder.com/216x320?text=Star+Wars',
                'age_rating' => 12,
                'status' => 'coming_soon',
                'duration' => 140,
                'genre' => 'Sci-Fi'
            ]
        ];

        foreach ($movies as $movieData) {
            $showtimes = $movieData['showtimes'] ?? [];
            unset($movieData['showtimes']);
            
            $movie = Movie::create($movieData);
            
            foreach ($showtimes as $showtimeData) {
                $movie->showtimes()->create($showtimeData);
            }
        }
    }
}
