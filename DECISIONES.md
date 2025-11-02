# Decisiones y Trade-offs del Proyecto

Este documento describe las decisiones técnicas clave, los trade-offs y los desafíos encontrados durante el desarrollo de la prueba técnica "MiniLiga Express".

## 1. Arquitectura de Backend: MVC Estándar de Laravel

Se optó por utilizar la arquitectura estándar de Laravel (basada en Modelo-Vista-Controlador y el patrón Active Record) en lugar de una arquitectura más compleja como la Hexagonal o la Arquitectura Limpia.

* **Justificación:** La prueba solicita un **MVP** (Producto Mínimo Viable), y esta arquitectura permite el prototipado rápido para cumplir con el tiempo estipulado.
* **Trade-off:** La lógica de negocio (`standings`) está acoplada al framework (Eloquent), lo cual es un compromiso aceptable para el alcance de la prueba.

---

## 2. Decisiones de Tecnología Frontend (Web/Móvil)

Se utilizó **Angular Material** en la aplicación web para un diseño rápido y profesional, y **Capacitor/Ionic** en la móvil.

* **Frameworks Elegidos:** Angular para Web y Angular/Ionic para Móvil.
* **Librería de Componentes:** Se eligió **Angular Material** sobre estilos propios o Tailwind para garantizar un diseño cohesivo y profesional con un mínimo esfuerzo de CSS.
* **Arquitectura de Servicios:** Se implementó un **ApiService** centralizado en ambos frontends (`web/` y `mobile/`). Esto asegura la **separación de responsabilidades**; los componentes solo manejan la UI, y el servicio gestiona el "contrato" con la API, facilitando el mantenimiento.

---

## 3. Desafíos y Soluciones Técnicas

### 3.1. Elección de la Base de Datos
Se eligió **MySQL** sobre SQLite por su solidez en producción, lo que permite demostrar capacidad de trabajo con un RDBMS real y facilita la depuración con herramientas como MySQL Workbench.

### 3.2. Palabra Reservada `Match` (PHP)
El nombre `Match` es una palabra reservada de PHP 8.0+. Se usó el modelo **`Game`** internamente (`App\Models\Game`) para evitar errores fatales, mientras que el endpoint de la API (`/api/matches/{id}/result`) se mantuvo para cumplir con el contrato solicitado.

### 3.3. Lógica de Clasificación
* **Corrección de Colección:** Se corrigió el método de ordenamiento de colecciones de Laravel, reemplazando las llamadas incorrectas (`thenByDesc`) por la sintaxis correcta `sortBy([['col', 'desc'], ...])` para ordenar por múltiples columnas (puntos, diferencia de goles, goles a favor).
* **Endpoint Adicional:** Se creó el endpoint **`GET /api/games/pending`** en el backend para suplir la necesidad de la app móvil de listar partidos sin resultado, lo cual no estaba especificado inicialmente.

---

## 4. Bonus: Implementación de Cámara (Capacitor)

* Se implementó la funcionalidad opcional de previsualización de foto en la pestaña 'Reportar Resultado'.
* **Mecanismo:** Se usó el plugin **`@capacitor/camera`** para acceder a la cámara nativa del dispositivo.
* **Estructura:** Se corrigió la lógica de la UI para evitar anidamiento incorrecto de etiquetas HTML, asegurando que el botón y la previsualización funcionen sin romper la estructura de la tarjeta.

---

## 5. Próximos Pasos y Mejoras (Si hubiera más tiempo)

### 5.1. Arquitectura y Escalabilidad del Backend
* **Separación de Lógica:** Mover la lógica compleja del cálculo de clasificación del `StandingsController` a un "Servicio de Dominio" (Service Layer) puro para desacoplar el código de Eloquent.
* **Optimización de Consultas:** Implementar una Caché (ej., Redis) en el endpoint `/api/standings`, ya que el cálculo es intensivo y la clasificación no cambia en cada petición.

### 5.2. Estabilidad y Mantenimiento
* **Autenticación:** Añadir autenticación básica (ej., Laravel Sanctum) para proteger el endpoint `POST /api/matches/{id}/result`.
* **Manejo de Errores:** Implementar una gestión de errores más robusta y consistente en la API (ej., un JSON Response para todos los errores 404, 422, etc.).

### 5.3. Usabilidad del Frontend
* **Refresco Automático:** Añadir un mecanismo de refresco automático (*polling*) a la pestaña "Clasificación" de la web para que la tabla se actualice sin recargar la página.