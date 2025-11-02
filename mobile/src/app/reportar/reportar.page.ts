import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService, Game } from '../services/api';
import { Observable } from 'rxjs';

// Módulos de Ionic para la UI
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, 
  IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonImg, IonIcon 
} from '@ionic/angular/standalone';

//  2. IMPORTAMOS EL MÓDULO DE CAPACITOR CAMERA
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-reportar',
  templateUrl: 'reportar.page.html',
  styleUrls: ['reportar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, 
    IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonImg, 
    IonIcon 
  ],
})
export class ReportarPage implements OnInit {

  private api = inject(ApiService);
  private router = inject(Router);

  public pendingGames$!: Observable<Game[]>;
  public photoUrl: string | undefined;

  resultForm = new FormGroup({
    gameId: new FormControl(null, [Validators.required]),
    home_score: new FormControl(0, [Validators.required, Validators.min(0)]),
    away_score: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    this.pendingGames$ = this.api.getGames();
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      this.photoUrl = image.webPath;
    } catch (e) {
      console.error('Error al abrir la cámara:', e);
    }
  }

  onSubmit(): void {
    if (this.resultForm.invalid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const { gameId, home_score, away_score } = this.resultForm.value;

    if (!gameId) {
        alert('Debes seleccionar un partido.');
        return;
    }

    const payload = {
        home_score: +home_score!, 
        away_score: +away_score!
    };

    this.api.postResult(gameId, payload).subscribe({ 
      next: () => {
        alert('Resultado reportado con éxito. Puntos actualizados.');
        this.resultForm.reset({ gameId: null, home_score: 0, away_score: 0 });
        this.photoUrl = undefined;
        this.router.navigate(['/tabs/partidos']); 
      },
      error: (err) => {
        console.error('Error al reportar resultado:', err);
        alert('Error al enviar el resultado. Verifica la conexión con el backend.');
      }
    });
  }
}