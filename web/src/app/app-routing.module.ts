import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './features/teams/teams';
import { StandingsComponent } from './features/standings/standings';

const routes: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  { path: 'teams', component: TeamsComponent },
  { path: 'standings', component: StandingsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
    TeamsComponent,
    StandingsComponent 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }