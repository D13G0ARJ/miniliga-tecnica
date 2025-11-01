import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Standings } from '../../services/api'; // Imports de nuestro servicio
import { Observable } from 'rxjs';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './standings.html',
  styleUrl: './standings.scss'
})
export class StandingsComponent implements OnInit {
 
  // Inyectamos el servicio
  private api = inject(ApiService);

  // Observable para la tabla, se consume con pipe async en el html
  public standings$!: Observable<Standings[]>;

  ngOnInit(): void {
    // Carga inicial de datos
    this.standings$ = this.api.getStandings();
  }
}