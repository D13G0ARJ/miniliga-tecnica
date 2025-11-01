<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Team;
use App\Models\Game; 

class StandingsTest extends TestCase
{
    
    // Borra y rehace la base de datos (con migraciones) ANTES de ejecutar el test.
    use RefreshDatabase;

    
    public function test_standings_are_calculated_and_ordered_correctly(): void
    {
        // 1. ARRANGE (Organizar el escenario)
        
        // Creamos 4 equipos
        $teamA = Team::create(['name' => 'Vencedores']); // Ganará
        $teamB = Team::create(['name' => 'Perdedores']); // Perderá
        $teamC = Team::create(['name' => 'Empate 1']);  // Empatará
        $teamD = Team::create(['name' => 'Empate 2']);  // Empatará

        // Creamos 2 partidos "pendientes"
        $game1 = Game::create([
            'home_team_id' => $teamA->id,
            'away_team_id' => $teamB->id,
        ]);

        $game2 = Game::create([
            'home_team_id' => $teamC->id,
            'away_team_id' => $teamD->id,
        ]);

        // 2. ACT (Actuar)
        
        // Registramos los resultados llamando a nuestra propia API
        
        // Partido 1: Victoria de Vencedores (3-1)
        $this->postJson("/api/matches/{$game1->id}/result", [
            'home_score' => 3,
            'away_score' => 1,
        ]);

        // Partido 2: Empate (2-2)
        $this->postJson("/api/matches/{$game2->id}/result", [
            'home_score' => 2,
            'away_score' => 2,
        ]);

        // Finalmente, llamamos al endpoint que queremos probar
        $response = $this->getJson('/api/standings');


        // 3. ASSERT (Verificar los resultados)
        
        // Verificamos que la API respondió correctamente (HTTP 200)
        $response->assertStatus(200);

        // Verificamos que el orden de los nombres en el JSON es el correcto
        // (El más importante es el primero y el último)
        $response->assertSeeInOrder([
            'Vencedores', // 1º lugar con 3 pts
            'Empate 1',   // 2º/3º lugar con 1 pt
            'Empate 2',   // 2º/3º lugar con 1 pt
            'Perdedores', // 4º lugar con 0 pts
        ]);

        // Verificamos los datos exactos del primer equipo (Vencedores)
        $response->assertJsonPath('0.name', 'Vencedores');
        $response->assertJsonPath('0.points', 3);
        $response->assertJsonPath('0.wins', 1);
        $response->assertJsonPath('0.played', 1);
        $response->assertJsonPath('0.goal_diff', 2); // 3 (GF) - 1 (GA)

        // Verificamos los datos exactos del último equipo (Perdedores)
        $response->assertJsonPath('3.name', 'Perdedores');
        $response->assertJsonPath('3.points', 0);
        $response->assertJsonPath('3.losses', 1);
        $response->assertJsonPath('3.played', 1);
        $response->assertJsonPath('3.goal_diff', -2); // 1 (GF) - 3 (GA)

        // Verificamos los datos de un empate (Empate 1)
        $response->assertJsonPath('1.name', 'Empate 1');
        $response->assertJsonPath('1.points', 1);
        $response->assertJsonPath('1.draws', 1);
        $response->assertJsonPath('1.goal_diff', 0); // 2 (GF) - 2 (GA)
    }
}