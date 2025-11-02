# 🖥️ Backend (Laravel)

Este directorio contiene la API de Laravel para el proyecto "MiniLiga Express". Es responsable de gestionar los datos de equipos, partidos y calcular la tabla de clasificación.

## 🛠️ Stack Tecnológico

* **Framework:** Laravel 11+ (PHP 8.2+)
* **Base de Datos:** MySQL (Elección deliberada sobre SQLite para un entorno más robusto)
* **Testing:** PHPUnit (para el test de `Standings`)

## ⚙️ Guía de Setup y Arranque

Siga estos pasos para levantar el servidor backend localmente.

### 1. Configuración del Entorno (.env)

El proyecto está configurado para usar MySQL.

1.  Asegúrese de tener una base de datos MySQL creada (ej. `miniliga`).
2.  Copie el archivo de ejemplo de entorno:
    ```bash
    cp .env.example .env
    ```
3.  Edite el archivo `.env` con sus credenciales de base de datos:
    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=miniliga  # <-- Ponga aquí el nombre de su BD
    DB_USERNAME=root      # <-- Ponga aquí su usuario de MySQL
    DB_PASSWORD=          # <-- Ponga aquí su contraseña de MySQL
    ```

### 2. Instalación y Arranque

1.  **Instalar dependencias de Composer:**
    ```bash
    composer install
    ```
2.  **Generar la llave de la aplicación:**
    ```bash
    php artisan key:generate
    ```
3.  **Ejecutar Migraciones y Seeders:**
    Este comando creará todas las tablas y las poblará con datos de prueba (4 equipos y 2 partidos).
    ```bash
    php artisan migrate:refresh --seed
    ```
4.  **Levantar el servidor:**
    ```bash
    php artisan serve
    ```
El servidor estará disponible en `http://127.0.0.1:8000`.

---

## ✅ Cómo Correr el Test de Standings

Cumpliendo con los criterios de evaluación, el proyecto incluye un test (`StandingsTest.php`) que valida la lógica de cálculo de puntos.

Para ejecutarlo, necesita una base de datos de prueba separada (para no borrar sus datos de desarrollo).

### Paso 1: Configurar la Base de Datos de Prueba

1.  Cree una **segunda base de datos** en MySQL (ej. `miniliga_test`).
2.  Cree un archivo `.env.testing` en la raíz de `backend/`.
3.  Copie el siguiente contenido en `.env.testing` (apuntando a su nueva BD de prueba):

    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=miniliga_test  # <-- BD de prueba
    DB_USERNAME=root           # <-- Su usuario
    DB_PASSWORD=              # <-- Su contraseña
    ```

### Paso 2: Ejecutar PHPUnit

Con el archivo `.env.testing` creado, ejecute el comando de test:

```bash
php artisan test