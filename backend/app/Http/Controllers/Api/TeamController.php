<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    
    // Muestra una lista de todos los equipos.
    public function index()
    {
        // Simplemente obtenemos todos los equipos de la tabla 'teams'
        $teams = Team::all();
        
        // Devolvemos la colección como JSON
        return response()->json($teams);
    }

    
    //Almacena un nuevo equipo en la base de datos.
    
    public function store(Request $request)
    {
        // 1. Validación (Básica pero importante)
        // Esto asegura que el campo 'name' es requerido y único en la tabla 'teams'
        $validatedData = $request->validate([
            'name' => 'required|string|max:100|unique:teams',
        ]);

        // 2. Creación del equipo
        // 'create' espera un array con los datos validados
        $team = Team::create($validatedData);

        // 3. Devolvemos el equipo recién creado con un código de estado "201 Created"
        return response()->json($team, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
