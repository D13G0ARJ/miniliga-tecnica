import { Routes } from '@angular/router';
import { TeamsComponent } from './features/teams/teams';
import { StandingsComponent } from './features/standings/standings';


export const routes: Routes = [
  
  { 
    path: '', 
    redirectTo: 'teams', 
    pathMatch: 'full' 
  },
  
  { 
    path: 'teams', 
    component: TeamsComponent 
  },
  
  { 
    path: 'standings', 
    component: StandingsComponent 
  },
];