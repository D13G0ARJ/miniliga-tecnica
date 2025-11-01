```markdown
# 🌐 Web (Angular)

Aplicación construida con Angular (Standalone Components) y estilos de Angular Material.

## 💻 Funcionalidades Principales

El frontend Web permite las siguientes operaciones:

1.  **Pestaña Equipos:** Muestra el listado de equipos y un formulario reactivo para la creación de nuevos equipos (`POST /api/teams`).
2.  **Pestaña Clasificación:** Muestra la tabla de clasificación ordenada (`GET /api/standings`).

## 🧱 Arquitectura

Se sigue una arquitectura basada en **Servicios Centralizados**:

* **`ApiService`:** Única fuente de verdad que maneja las peticiones HTTP y la `API_URL`.
* **Componentes:** Los componentes (`TeamsComponent`, `StandingsComponent`) son "tontos"; solo inyectan el servicio, llaman a los métodos (`this.api.getStandings()`) y renderizan los datos.

## ▶️ Cómo Arrancar

```bash
# Desde la raíz del repo principal, navega a la carpeta web
cd web

# Instalar dependencias (Si no lo hizo el init_web.sh)
# npm install 

# Inicia el servidor de desarrollo
npm start
URL por defecto: http://localhost:4200