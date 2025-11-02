import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, Team } from '../../services/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss'
})
export class TeamsComponent implements OnInit {

  // Inyección del servicio de API
  private api = inject(ApiService);

  // Formulario reactivo para crear equipos
  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  // Observable para la lista de equipos (consumido por async pipe)
  public teams$!: Observable<Team[]>;

  ngOnInit(): void {
    // Carga inicial de equipos
    this.loadTeams();
  }

  // Carga la lista de equipos desde el servicio
  loadTeams(): void {
    this.teams$ = this.api.getTeams();
  }

  // Handler para el submit del formulario
  onSubmit(): void {
    // Guard clause para validación
    if (this.teamForm.invalid || !this.teamForm.value.name) {
      return;
    }
      
    const payload = { name: this.teamForm.value.name };

    // Llamada al servicio para crear
    this.api.createTeam(payload).subscribe({
      next: () => {
        // Éxito: refrescamos la lista y reseteamos el form
        this.loadTeams();
        this.teamForm.reset();
      },
      error: (err) => {
        // Manejo simple de errores
        console.error('Error creating team:', err);
        alert('Error al crear el equipo. ¿Quizás el nombre ya existe?');
      }
    });
  }
}