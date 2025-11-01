<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\Team;

class MatchController extends Controller
{
    public function result(Request $request, $id)
    {
        // 1. Validación de los datos de entrada
        $validatedData = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        // 2. Encontrar el partido
        // Usamos findOrFail para que falle automáticamente si el ID no existe
        $game = Game::findOrFail($id);

        // 3. Actualizar los marcadores en el partido (juego)
        $game->home_score = $validatedData['home_score'];
        $game->away_score = $validatedData['away_score'];
        $game->save();

        // 4. Actualizar las estadísticas en la tabla de equipos (Teams)
        // Esta es la lógica clave que pide el README
        
        // Encontrar los equipos
        $homeTeam = Team::find($game->home_team_id);
        $awayTeam = Team::find($game->away_team_id);

        // Actualizar goles a favor y en contra del equipo LOCAL
        $homeTeam->goals_for += $game->home_score;
        $homeTeam->goals_against += $game->away_score;
        $homeTeam->save();

        // Actualizar goles a favor y en contra del equipo VISITANTE
        $awayTeam->goals_for += $game->away_score;
        $awayTeam->goals_against += $game->home_score;
        $awayTeam->save();

        // 5. Devolver el partido (juego) actualizado
        return response()->json($game);
    }


    public function pending()
    {
        // Buscamos juegos donde 'home_score' sea NULO
        // y usamos 'with' para cargar también los datos de 'homeTeam' y 'awayTeam'
        $pendingGames = Game::whereNull('home_score')
                            ->with(['homeTeam', 'awayTeam'])
                            ->get();

        return response()->json($pendingGames);
    }
}
