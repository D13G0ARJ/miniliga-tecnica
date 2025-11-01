import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


export interface Team {
  id: number;
  name: string;
  goals_for: number;
  goals_against: number;
}

export interface Standings extends Team {
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  goal_diff: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Obtenemos la URL de la API desde el archivo de entorno
  private base = environment.API_URL;

  constructor(private http: HttpClient) { }

  // GET /api/teams
  getTeams() {
    // Le decimos a HttpClient que esperamos un array de tipo 'Team'
    return this.http.get<Team[]>(`${this.base}/api/teams`);
  }

  // POST /api/teams
  createTeam(payload: { name: string }) {
    return this.http.post<Team>(`${this.base}/api/teams`, payload);
  }

  // GET /api/standings
  getStandings() {
    // Le decimos a HttpClient que esperamos un array de tipo 'Standings'
    return this.http.get<Standings[]>(`${this.base}/api/standings`);
  }
}