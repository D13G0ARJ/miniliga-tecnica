import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface Team {
  id: number;
  name: string;
  goals_for: number;
  goals_against: number;
}

export interface Game {
  id: number;
  home_team_id: number;
  away_team_id: number;
  home_score: number | null;
  away_score: number | null;
  // Añadimos los objetos de equipo para ver los nombres
  home_team?: Team; 
  away_team?: Team;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  private base = environment.API_URL;

  constructor() { }

  

  getGames() {
    // Pedimos los partidos pendientes
    return this.http.get<Game[]>(`${this.base}/api/games/pending`);
  }

  // POST /api/matches/{id}/result
  postResult(id: number, payload: { home_score: number, away_score: number }) {
    return this.http.post<Game>(`${this.base}/api/matches/${id}/result`, payload);
  }
}