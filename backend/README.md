## 🖥️ 2. `backend/README.md`

Este archivo se enfoca en la API y cómo ejecutar las pruebas.

```markdown
# 🖥️ Backend (Laravel)

El backend expone los datos necesarios para gestionar la liga y es el único responsable del cálculo de la clasificación (standings).

## 🧩 Estructura y Tecnologías

* **Framework:** Laravel 11+ (PHP).
* **Database:** MySQL (Configurado en `.env` - **IMPORTANTE**).
* **Modelos Clave:** `Team.php` y `Game.php` (usado en lugar de `Match` por palabra reservada de PHP).
* **Controladores:** `TeamController`, `MatchController`, `StandingsController`.

## ⚙️ Guía de Setup y Arranque (MySQL)

Para iniciar el proyecto, siga estos pasos:

### 1. Configuración del Entorno (`.env`)

Cree una base de datos MySQL (ej. `miniliga`) y configure su archivo `.env` en la carpeta `backend/` con sus credenciales:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=miniliga  # <-- Nombre de su base de datos
DB_USERNAME=root      # <-- Su usuario de MySQL
DB_PASSWORD=          # <-- Su contraseña de MySQL

## 🗺️ Endpoints Implementados

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/teams` | Listado de todos los equipos. |
| `POST` | `/api/teams` | Creación de un nuevo equipo (`{ name }`). |
| `POST` | `/api/matches/{id}/result` | Registra el marcador (`{ home_score, away_score }`) y actualiza las estadísticas de los equipos. |
| `GET` | `/api/standings` | Devuelve la tabla de clasificación ordenada. |
| **Extra** | `/api/games/pending` | Endpoint para la app móvil: lista los partidos sin resultado. |

## 📐 Lógica de Clasificación

La tabla se calcula con: `W=3`, `D=1`, `L=0`.

* **Ordenamiento:**
    1.  `points` (DESC)
    2.  `goal_diff` (DESC)
    3.  `goals_for` (DESC)

## ✅ Ejecución de Pruebas

Para validar la lógica de standings, se incluye un Feature Test.

```bash
# Asegúrate de que el servidor MySQL esté corriendo
cd backend

# Ejecuta todos los tests (incluyendo StandingsTest.php)
php artisan test