import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Módulos de Ionic para la UI
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';

// Importamos nuestro servicio y la interfaz Game
import { ApiService, Game } from '../services/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-partidos',
  templateUrl: 'partidos.page.html',
  styleUrls: ['partidos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonNote
  ],
})
export class PartidosPage implements OnInit {

  // Inyectamos el servicio
  private api = inject(ApiService);

  // Observable para la lista de partidos
  public pendingGames$!: Observable<Game[]>;

  ngOnInit(): void {
    // Carga inicial de partidos pendientes
    this.loadGames();
  }

  loadGames(): void {
    this.pendingGames$ = this.api.getGames();
  }
}