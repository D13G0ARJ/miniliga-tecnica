<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Game;

class StandingsController extends Controller
{
    
    //Muestra la tabla de clasificación (standings).
     
    public function index()
    {
        // 1. Obtener todos los equipos y ponerlos en una colección 
        //    donde la 'key' es el 'id' del equipo. Esto es para acceso ultra-rápido.
        $teams = Team::all()->keyBy('id');

        // 2. Inicializar las estadísticas para cada equipo
        foreach ($teams as $team) {
            $team->played = 0;
            $team->wins = 0;
            $team->draws = 0;
            $team->losses = 0;
            $team->points = 0;
            $team->goal_diff = 0; // Se calculará después
        }

        // 3. Obtener solo los partidos que ya tienen un resultado
        $playedGames = Game::whereNotNull('home_score')
                           ->whereNotNull('away_score')
                           ->get();

        // 4. Iterar sobre los partidos y calcular puntos
        foreach ($playedGames as $game) {
            // Saltar si por alguna razón el equipo no se encuentra
            if (!isset($teams[$game->home_team_id]) || !isset($teams[$game->away_team_id])) {
                continue;
            }

            $homeTeam = $teams[$game->home_team_id];
            $awayTeam = $teams[$game->away_team_id];

            // Incrementar partidos jugados
            $homeTeam->played++;
            $awayTeam->played++;

            // Asignar puntos basados en el resultado
            if ($game->home_score > $game->away_score) {
                // Gana Local
                $homeTeam->wins++;
                $homeTeam->points += 3; // Victoria = 3 puntos
                $awayTeam->losses++;
            } elseif ($game->home_score < $game->away_score) {
                // Gana Visitante
                $awayTeam->wins++;
                $awayTeam->points += 3;
                $homeTeam->losses++;
            } else {
                // Empate
                $homeTeam->draws++;
                $homeTeam->points += 1; // Empate = 1 punto
                $awayTeam->draws++;
                $awayTeam->points += 1;
            }
        }

        // 5. Calcular la diferencia de goles para todos
        foreach ($teams as $team) {
            $team->goal_diff = $team->goals_for - $team->goals_against;
        }

        // 6. Ordenar la colección según las reglas
        $sortedStandings = $teams->sortBy([
            ['points', 'desc'],
            ['goal_diff', 'desc'],
            ['goals_for', 'desc'],
        ]);

        // 7. Devolver como un array JSON (usamos values() para resetear las keys)
        return response()->json($sortedStandings->values());
    }
}
