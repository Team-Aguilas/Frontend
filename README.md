# Frontend del Marketplace (React)

Esta es la aplicación de frontend para el "Marketplace de Frutas y Verduras". Es una Single Page Application (SPA) construida con React que consume los microservicios del backend para proporcionar la interfaz de usuario.

La aplicación permite a los usuarios ver productos, buscar y filtrar el catálogo, registrarse, iniciar sesión, y gestionar los productos que han creado.

## Tecnologías Utilizadas

-   **Framework/Librería:** React
-   **Bundler/Entorno de Desarrollo:** Vite
-   **Librería de UI:** Material-UI (MUI)
-   **Routing:** React Router
-   **Cliente HTTP:** Axios
-   **Gestión de Estado (Autenticación):** React Context
-   **Lenguaje:** JavaScript (JSX)

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:
-   Node.js (versión 18.x o superior es recomendada)
-   npm (usualmente se instala con Node.js)
-   **Importante:** Los dos microservicios del backend (`products_service` y `users_service`) deben estar en ejecución para que el frontend pueda obtener y enviar datos.

## Configuración

1.  **Variables de Entorno:**
    En la raíz de esta carpeta (`frontend/`), crea un archivo llamado `.env.development` con las URLs de los servicios de backend:
    ```env
    VITE_PRODUCTS_API_URL=http://localhost:8001/api/v1
    VITE_USERS_API_URL=http://localhost:8002/api/v1
    VITE_PRODUCTS_SERVER_URL=http://localhost:8001
    ```

## Instalación

1.  Navega a la carpeta `frontend` en tu terminal.
    ```bash
    cd frontend
    ```
2.  Instala todas las dependencias del proyecto.
    ```bash
    npm install
    ```

## Ejecución en Modo Desarrollo

Para iniciar el servidor de desarrollo de Vite:

1.  Asegúrate de estar en la carpeta `frontend/`.
2.  Ejecuta el siguiente comando:
    ```bash
    npm run dev
    ```
3.  Abre tu navegador y ve a la URL que indica la terminal (usualmente **http://localhost:5173/**).
