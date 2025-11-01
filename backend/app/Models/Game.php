<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory; 

    protected $fillable = ['home_score', 'away_score', 'home_team_id', 'away_team_id']; 

    
    public function homeTeam()
    {
        // Un partido 'pertenece a' un equipo a través de la llave 'home_team_id'
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    /**
     * Define la relación con el equipo visitante (Away Team).
     */
    public function awayTeam()
    {
        // Un partido 'pertenece a' un equipo a través de la llave 'away_team_id'
        return $this->belongsTo(Team::class, 'away_team_id');
    }
}