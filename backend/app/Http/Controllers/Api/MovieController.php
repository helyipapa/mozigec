<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movie::with('showtimes')->get();
        return response()->json($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'poster_url' => 'nullable|string',
            'age_rating' => 'nullable|integer',
            'status' => 'required|in:current,coming_soon',
            'duration' => 'nullable|integer',
            'genre' => 'nullable|string',
            'release_date' => 'nullable|date'
        ]);

        $movie = Movie::create($validated);
        return response()->json($movie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movie::with('showtimes')->findOrFail($id);
        return response()->json($movie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $movie = Movie::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'poster_url' => 'nullable|string',
            'age_rating' => 'nullable|integer',
            'status' => 'in:current,coming_soon',
            'duration' => 'nullable|integer',
            'genre' => 'nullable|string',
            'release_date' => 'nullable|date'
        ]);

        $movie->update($validated);
        return response()->json($movie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $movie = Movie::findOrFail($id);
        $movie->delete();
        return response()->json(null, 204);
    }
}
