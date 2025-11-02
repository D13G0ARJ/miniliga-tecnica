```markdown
# 📱 App Móvil (Ionic + Capacitor)

Aplicación construida con Ionic (Angular Standalone) enfocada en la interacción de reportes.

## 🛠️ Funcionalidades Implementadas

La aplicación móvil está diseñada para ser usada por un administrador de partidos:

1.  **Pestaña Partidos:** Muestra un listado de **Partidos Pendientes** (`GET /api/games/pending`).
2.  **Pestaña Reportar:** Contiene un formulario para seleccionar un partido y registrar su resultado (`POST /api/matches/{id}/result`).

## 📷 Bonus: Funcionalidad de Cámara (Capacitor)

Se incluyó la funcionalidad opcional de previsualización de foto en el formulario de reporte. Esto demuestra la integración con el plugin **`@capacitor/camera`** para acceder a funciones nativas del dispositivo.

## ▶️ Cómo Arrancar

Asegúrese de que el backend esté corriendo (`php artisan serve`).

```bash
# Desde la raíz del repo principal, navega a la carpeta mobile
cd mobile

# Inicia el servidor de Ionic
ionic serve
URL por defecto: http://localhost:8100

💻 Para Emulación Nativa (iOS/Android)
Para generar el proyecto nativo y probar el bonus de la cámara en un simulador:

Bash

# Compilar la app para producción (genera la carpeta 'www')
npm run build

# Sincronizar el código compilado con las plataformas
npx cap sync

# Añadir plataforma (solo una vez)
# npx cap add ios
# npx cap add android

# Abrir el IDE nativo (Xcode o Android Studio)
npx cap open ios 
# o
# npx cap open android