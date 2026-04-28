# Signalia Landing Page

Este repositorio contiene el código fuente de la landing page de **Signalia**, una consultoría tech en CDMX enfocada en visibilidad digital y automatización para PyMEs.

## Tecnologías Utilizadas
- [Next.js](https://nextjs.org) (App Router)
- React
- Módulos CSS (`page.module.css`)
- TypeScript

## Requisitos Previos
- Node.js (versión 18.x o superior)
- npm o Yarn

## Cómo Correr el Proyecto

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página localmente.

## Estructura de Archivos
- `app/page.tsx`: Componente principal de la landing page (contiene todo el HTML/Estructura).
- `app/page.module.css`: Todos los estilos principales.
- `public/`: Assets estáticos e imágenes.

## Cómo Contribuir
- Para modificar textos: Revisa el objeto `translations` en la parte superior de `app/page.tsx`.
- Para cambiar estilos: Modifica las variables CSS globales en `app/globals.css` (si lo hay) o en `app/page.module.css`.
- Al terminar un cambio asegurar que el proyecto compila usando `npm run build`.

## Despliegue (Deployment)
El proyecto está configurado para desplegarse fácilmente en [Vercel](https://vercel.com/). Simplemente vincula el repositorio de GitHub con tu cuenta de Vercel.
