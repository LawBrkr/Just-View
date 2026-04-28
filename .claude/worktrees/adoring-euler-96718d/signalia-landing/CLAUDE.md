# SIGNALIA — Instrucciones para Claude

## Qué es este proyecto

Landing page para **Signalia**, consultora tech en CDMX que ayuda a PyMEs locales con dos servicios:
- **Signal** — visibilidad digital (Google Business Profile, SEO local)
- **Alia** — automatización con IA (atención, inventario, seguimiento)

Mercado objetivo: negocios en colonias premium de CDMX (Polanco, Condesa, Roma, Coyoacán, Del Valle, Santa Fe) con presupuesto de $2,500–$7,500 MXN/mes. Personas: restauranteros, dentistas, hoteles boutique, startups.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript estricto |
| UI | React 19 — **sin shadcn, sin Tailwind, sin bibliotecas UI** |
| Estilos | CSS Modules + Design Tokens en `globals.css` |
| Fuentes | Self-hosted WOFF2 en `public/fonts/` — sin Google Fonts en runtime |
| Despliegue | Vercel |
| i18n | JSON estático en `messages/` — sin next-intl ni librería |
| Datos | JSON estático en `data/` |

---

## Reglas de arquitectura — NO negociables

### Componentes Server vs Client
- **Server por default.** Solo añadir `"use client"` si hay: hooks de estado, efectos, eventos del DOM, IntersectionObserver.
- Componentes de solo lectura (Pricing, Process, Personas, Footer) = siempre Server.
- Componentes interactivos (Navbar, FAQ, contadores, FloatingWhatsApp) = Client.
- **Nunca** convertir un Server Component a Client solo para "simplificar".

### CSS
- Cada componente tiene su propio `.module.css`.
- Los design tokens (colores, tipografía, espaciado, sombras) viven en `app/globals.css` bajo `:root`. Usar siempre `var(--token)`, nunca valores hardcodeados.
- Colores principales: `--color-primary: #2D2B6B`, `--color-accent: #534AB7`, `--color-green: #1D9E75`.
- **Sin Tailwind.** Si parece conveniente agregarlo — no hacerlo.
- Responsive mobile-first con media queries en el propio `.module.css`.

### Generación estática
- La página principal tiene `export const dynamic = "force-static"` y `export const revalidate = 86400`.
- No introducir `cookies()`, `headers()`, ni fetch dinámico en `page.tsx`. Rompe la generación estática.
- Datos desde JSON local, no desde APIs externas en tiempo de build (a menos que se pida explícitamente).

### TypeScript
- Modo estricto — sin `any`, sin `as unknown`.
- Los tipos de traducción se derivan directamente del JSON: `type HeroDict = (typeof esMessages)["hero"]`.
- Nunca crear interfaces paralelas que dupliquen la forma del JSON.

---

## i18n — cómo funciona aquí

No hay librería de i18n. El sistema es manual y **así debe quedarse** salvo que se indique lo contrario.

- `messages/es.json` — español (idioma principal y default)
- `messages/en.json` — inglés (paridad completa)
- El switcher de idioma vive en `NavbarClient.tsx` como estado client-side. No hay rutas por locale (`/es/`, `/en/`).
- Las traducciones se importan en `page.tsx` y se pasan como props tipadas a cada componente.
- Al añadir texto nuevo: siempre agregar la clave en **ambos** archivos JSON, es.json primero.
- Nunca hardcodear strings en español directamente en JSX.

---

## Convenciones de código

- **Sin comentarios explicativos** sobre qué hace el código. Solo comentarios cuando el POR QUÉ no es obvio (workaround, invariante oculto).
- Marcadores de sección en CSS con `/* ═══ NOMBRE ═══ */` — mantener el estilo existente.
- Nombres de archivos: PascalCase para componentes (`NavbarClient.tsx`), camelCase para hooks (`useCounter.ts`), kebab-case para CSS modules (`hero.module.css`).
- Hooks personalizados en `app/hooks/`.

---

## Performance — objetivos mínimos

- Lighthouse Performance ≥ 90 en mobile.
- Fuentes con `font-display: swap` y preload para el peso más usado (700).
- Imágenes: AVIF primero, WebP fallback, `next/image` obligatorio.
- Sin scripts de terceros que bloqueen el render principal.
- Sin CSS-in-JS — los CSS Modules se extraen en build time.

---

## Seguridad y headers

En `next.config.ts` están configurados:
- `X-Frame-Options: SAMEORIGIN`
- HSTS con 1 año
- CSP: self-only, excepciones para Next.js runtime y Cal.com iframe

Al añadir recursos externos (fuentes, scripts, embeds), actualizar el CSP. No omitir este paso.

---

## Next.js 16 — advertencias

**Esta versión tiene breaking changes respecto a Next.js 14/15.** Antes de usar cualquier API de Next.js que no esté ya en el código:

1. Revisar `node_modules/next/dist/` para la API actualizada.
2. No asumir que los ejemplos de documentación pública (pre-2025) son válidos.
3. `useRouter`, `usePathname`, `useSearchParams` — verificar imports desde `next/navigation`, no `next/router`.

---

## Comandos útiles

```bash
# Desarrollo
npm run dev          # localhost:3000

# Build y verificación
npm run build        # build de producción
npm run lint         # ESLint (0 warnings permitidos)
npx tsc --noEmit     # type-check sin compilar

# Verificar puerto en uso (Windows)
cmd //c 'netstat -ano | findstr :3000'
```

---

## Lo que NO hacer en este proyecto

- No instalar Tailwind, shadcn/ui, Radix, Chakra, o cualquier biblioteca de componentes UI.
- No agregar `next-intl` ni otra librería de i18n sin discutirlo.
- No usar `getServerSideProps` — este es App Router puro.
- No convertir `page.tsx` a Client Component.
- No hardcodear strings de UI sin agregar la clave al JSON de traducciones.
- No crear archivos de documentación (`.md`) sin que se pida explícitamente.
- No agregar manejo de errores para escenarios imposibles en componentes server estáticos.
- No usar `console.log` en producción; limpiarlos antes de commit.
- No añadir abstracciones que no estén siendo usadas en más de un lugar.

---

## Estructura de directorios clave

```
app/
  components/       # Componentes (Server o Client según necesidad)
  hooks/            # Custom hooks (solo client-side logic)
  globals.css       # Design tokens — única fuente de verdad para variables
  page.tsx          # Entry point — Server Component, importa traducciones
  layout.tsx        # Root layout — fuentes, metadata global
messages/
  es.json           # Traducciones español (default)
  en.json           # Traducciones inglés
data/
  testimonials.json
  social-proof.json
public/
  fonts/            # WOFF2 self-hosted
```
