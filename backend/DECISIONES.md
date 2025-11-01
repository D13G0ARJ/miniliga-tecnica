# Decisiones y Trade-offs del Proyecto

Este documento describe las decisiones técnicas clave, los trade-offs y los desafíos encontrados durante el desarrollo de la prueba técnica "MiniLiga Express".

## 1. Elección de la Base de Datos: MySQL sobre SQLite

Aunque las instrucciones sugerían el uso de **SQLite** para una configuración rápida, se tomó la decisión deliberada de implementar la solución con **MySQL**.

**Justificación:**

* **Similitud con Producción:** MySQL es un sistema gestor de bases de datos (RDBMS) robusto y ampliamente utilizado en entornos de producción. Optar por él demuestra la capacidad de trabajar en un entorno más realista y complejo.
* **Herramientas de Inspección:** El uso de un servidor MySQL permite la conexión a herramientas de gestión visual (como MySQL Workbench, DataGrip o DBeaver). Esto facilita enormemente la inspección de los datos, la depuración de las migraciones y la validación de la lógica de negocio (como el cálculo de *standings*) durante el desarrollo.
* **Validación Estricta:** MySQL aplica un tipado de datos y una integridad referencial (foreign keys) más estricta que SQLite por defecto, lo que ayuda a prevenir errores de forma temprana en el ciclo de desarrollo.

## 2. Desafío: Palabra Reservada `Match` de PHP

Durante la ejecución de los scripts de inicialización, se encontró un conflicto crítico: el nombre `Match` es una **palabra clave reservada en PHP 8.0 y superior** (utilizada para la expresión `match()`).

Esto impidió que Laravel pudiera crear el modelo `App\Models\Match`.

**Solución y Cambios Implementados:**

Se decidió usar el sinónimo `Game` (Juego/Partido) para todos los componentes internos de la lógica del modelo de datos.

Esto generó los siguientes cambios sobre el plan original:

* **Modelo:** Se creó `App\Models\Game` en lugar de `App\Models\Match`.
* **Migración:** El archivo de migración se renombró a `..._create_games_table.php`.
* **Tabla:** El nombre de la tabla en la base de datos es `games`, no `matches`.
* **Seeder:** El archivo `TeamsAndMatchesSeeder.php` fue modificado para poblar el modelo `App\Models\Game`.
* **Controlador:** El `MatchController` (que sí mantiene el nombre `Match` por el requisito de la API) fue modificado para importar y utilizar el modelo `App\Models\Game` en toda su lógica (`Game::find(...)`, etc.).

**Trade-off:** Esta decisión disocia el nombre del recurso de la API (`/api/matches/{id}`) del nombre del modelo (`Game`), lo cual es una práctica común y aceptada en el desarrollo de APIs RESTful para mantener la claridad de la API de cara al cliente.