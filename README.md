# 🏆 MiniLiga Express — Prueba Técnica

Este repositorio contiene la solución completa para la Prueba Técnica MiniLiga Express. El proyecto es un **MVP (Producto Mínimo Viable) funcional** que gestiona una mini liga de fútbol, compuesto por una API robusta, una aplicación web y una aplicación móvil.

---

## 🧭 Tabla de Contenidos

1.  [🚀 Criterios de Éxito Cumplidos](#-criterios-de-éxito-cumplidos)
2.  [🛠️ Stack Tecnológico](#-stack-tecnológico)
3.  [⚙️ Guía de Configuración Global](#-guía-de-configuración-global-requisitos)
    * [Requisitos Previos](#requisitos-previos)
    * [1. Inicialización de Proyectos](#1-inicialización-de-proyectos)
    * [2. Arranque del Sistema](#2-arranque-del-sistema)

---

## 🚀 Criterios de Éxito Cumplidos

Todos los criterios de evaluación han sido cubiertos y validados:

* **MVP Funcional:** Los 4 *endpoints* principales de la API y ambas interfaces de usuario (Web y Móvil) están completamente operativas.
* **Código Limpio:** Claridad, modularidad, estricta separación de responsabilidades (Servicios API centrales) y validaciones de datos básicas implementadas.
* **Flujo de Git:** Uso de ramas por *feature* (`feature/backend-mvp`, `feature/frontend-mvp`) y **2 Pull Requests** documentados y mergheados.
* **Tests Unitarios:** Un *Feature Test* en el backend verifica la lógica correcta para el cálculo de clasificaciones (*standings*).
* **Documentación (Docs):** Archivos `README.md` específicos para cada subproyecto y el archivo `DECISIONES.md` detallando las justificaciones arquitectónicas y la elección de tecnologías.

## 🛠️ Stack Tecnológico

| Componente | Frameworks | Base de Datos | Estilos/UI | Bonus Implementado |
| :--- | :--- | :--- | :--- | :--- |
| **Backend** | Laravel 11+ | MySQL (Elegido sobre SQLite) | N/A | Endpoint Adicional y Test de Feature |
| **Web** | Angular (Latest) | API Laravel | Angular Material | Router y Componentes Modulares |
| **Móvil** | Ionic + Capacitor | API Laravel | Ionic Components | Integración de Cámara (Capacitor) |

## ⚙️ Guía de Configuración Global (Requisitos)

### Requisitos Previos

Asegúrese de tener instalados los siguientes entornos de desarrollo antes de comenzar:

* `PHP >= 8.2` y `Composer`
* `Node.js >= 18` y `npm`
* `Git`
* **CLI Globales:**
    * `Angular CLI`: Instalar con `npm install -g @angular/cli`
    * `Ionic CLI`: Instalar con `npm install -g @ionic/cli`

### 1. Inicialización de Proyectos

Ejecute los siguientes scripts de inicialización **desde la raíz del repositorio**, después de la clonación. Estos comandos instalarán las dependencias necesarias para cada subproyecto.

```bash
# 1. Inicializa el proyecto Laravel (instala composer, crea archivos .env, etc.)
bash scripts/init_backend.sh

# 2. Instala dependencias para la Web (Angular)
bash scripts/init_web.sh

# 3. Instala dependencias para la Móvil (Ionic)
bash scripts/init_mobile.sh

### 2. Arranque del Sistema

Para levantar el sistema completo, siga estos pasos:

#### **A. Backend (API)**

1.  Navegue al directorio del backend:
    ```bash
    cd backend
    ```
2.  Ejecute las migraciones y *seeding* para configurar la base de datos:
    ```bash
    php artisan migrate:refresh --seed
    # ESTE PASO ES CRÍTICO: Crea las tablas en MySQL y añade los datos de prueba.
    ```
3.  Inicie el servidor de desarrollo de Laravel:
    ```bash
    php artisan serve
    ```

#### **B. Aplicación Web (Angular)**

1.  Navegue al directorio web:
    ```bash
    cd web
    ```
2.  Inicie el servidor de desarrollo de Angular:
    ```bash
    npm start
    ```
    *(La aplicación web estará accesible en: `http://localhost:4200`)*

#### **C. Aplicación Móvil (Ionic)**

1.  Navegue al directorio móvil:
    ```bash
    cd mobile
    ```
2.  Inicie el servidor de desarrollo de Ionic:
    ```bash
    ionic serve
    ```
    *(La aplicación móvil estará accesible en: `http://localhost:8100`)*