# Workspace Audit — Signalia Proyecto
**Fecha:** 2026-03-27
**Repositorio origen:** https://github.com/LawBrkr/signalia-proyecto-
**Generado por:** Claude (Cowork Mode · DevOps Audit)

---

## 1. Resumen de Sincronización

| Estado | Detalle |
|--------|---------|
| ✅ Clonado | Repositorio clonado exitosamente |
| ✅ Sincronizado | Workspace actualizado con todos los archivos del repo |
| ✅ Gestor de paquetes | **npm** (detectado via `package-lock.json`) |
| ✅ Framework | **Next.js 16.2.1** con App Router + TypeScript |
| ✅ `npm install` | Completado — 350 paquetes auditados |
| ⚠️ Vulnerabilidades | 2 encontradas (ver Sección 4) |

---

## 2. Estructura del Repositorio

```
signalia-proyecto-/                   ← Raíz del repositorio
├── plan_ejecutivo.html               ← Documento estratégico HTML
├── ranking_modelos_negocio.html      ← Análisis de modelos de negocio
├── signalia-brand-guidelines.docx   ← Guía de marca (Word)
└── signalia-landing/                ← App Next.js (proyecto principal)
    ├── .gitignore
    ├── .next/                        ← (generado por build, ignorado por git)
    ├── .vercel/                      ← (config local Vercel, ignorado por git)
    ├── AGENTS.md                     ← Contexto para agentes AI
    ├── CLAUDE.md                     ← Instrucciones para Claude
    ├── README.md
    ├── eslint.config.mjs
    ├── init.sh                       ← Script de inicialización (generado)
    ├── next-env.d.ts                 ← (generado por Next.js, ignorado por git)
    ├── next.config.ts
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    ├── app/                          ← App Router (Next.js 13+)
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── icon.svg
    │   ├── layout.tsx
    │   ├── opengraph-image.png
    │   ├── page.module.css
    │   └── page.tsx                  ← Landing page principal (SSR + "use client")
    ├── node_modules/                 ← (instalado, no versionado)
    └── public/
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        └── window.svg
```

---

## 3. Dependencias del Proyecto

### Producción
| Paquete | Versión |
|---------|---------|
| `next` | 16.2.1 |
| `react` | 19.2.4 |
| `react-dom` | 19.2.4 |

### Desarrollo
| Paquete | Versión |
|---------|---------|
| `@types/node` | ^20 |
| `@types/react` | ^19 |
| `@types/react-dom` | ^19 |
| `eslint` | ^9 |
| `eslint-config-next` | 16.2.1 |
| `typescript` | ^5 |

---

## 4. Vulnerabilidades de Seguridad

> ⚠️ Se encontraron **2 vulnerabilidades** en dependencias de desarrollo (no afectan producción directamente).

### CVE-1: `brace-expansion` — Severidad MODERADA
- **Paquete:** `brace-expansion < 1.1.13`
- **Riesgo:** Zero-step sequence causa hang y agotamiento de memoria
- **Afecta:** `@typescript-eslint/typescript-estree` (devDependency)
- **Fix:** `npm audit fix`

### CVE-2: `picomatch` — Severidad ALTA
- **Paquete:** `picomatch <= 2.3.1` y `4.0.0 - 4.0.3`
- **Riesgo:** Method Injection + ReDoS via extglob quantifiers
- **Afecta:** `tinyglobby` (dependencia interna de Next.js build)
- **Fix:** `npm audit fix`

**Acción recomendada:**
```bash
cd signalia-landing
npm audit fix
```

> Nota: Ambas vulnerabilidades están en dependencias de **build/dev**, no en el bundle de producción desplegado en Vercel.

---

## 5. Archivos Faltantes (Típicamente en `.gitignore`)

Los siguientes archivos **no están versionados** y deben crearse manualmente según el entorno:

| Archivo | Motivo | Acción |
|---------|--------|--------|
| `.env.local` | Variables de entorno locales | Crear con variables necesarias |
| `.env.production` | Variables para producción | Configurar en Vercel Dashboard |
| `next-env.d.ts` | Generado automáticamente por Next.js | Se crea con `npm run dev` o `npm run build` |
| `.next/` | Carpeta de build | Se genera con `npm run build` |
| `.vercel/` | Config local de Vercel CLI | Se genera al hacer `vercel` por primera vez |

### Ejemplo mínimo de `.env.local`
```env
# URL base del sitio (opcional para la landing actual)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Agregar aquí futuros tokens de APIs (analytics, CRM, etc.)
```

---

## 6. Análisis de Configuración para Vercel

### `next.config.ts` — Estado: ✅ Mínimo, sin bloqueos
```typescript
// Configuración vacía — Next.js usará defaults
const nextConfig: NextConfig = {};
```
No hay configuraciones que impidan el deploy. Vercel detectará automáticamente Next.js.

### Consideraciones para Vercel Deploy

| Item | Estado | Nota |
|------|--------|------|
| Framework detectado | ✅ Auto | Vercel detecta Next.js por `next.config.ts` |
| Build command | ✅ Default | `npm run build` (`next build`) |
| Output directory | ✅ Default | `.next` |
| Install command | ✅ Default | `npm install` |
| Node.js version | ⚠️ Verificar | Usar Node 18.x o 20.x en Vercel settings |
| `vercel.json` | ⚠️ Ausente | Opcional pero recomendado para control fino |
| Variables de entorno | ⚠️ Pendiente | Configurar en Vercel Dashboard si aplica |

### Configuración `vercel.json` recomendada (opcional)
Si deseas control explícito, crea `signalia-landing/vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"]
}
```

---

## 7. Comandos de Referencia Rápida

```bash
# Desarrollo local
cd signalia-landing
npm run dev          # → http://localhost:3000

# Build de producción
npm run build
npm run start        # Servidor de producción local

# Linting
npm run lint

# Fix vulnerabilidades
npm audit fix

# Deploy a Vercel (requiere Vercel CLI)
npm i -g vercel
vercel               # Primera vez (configura proyecto)
vercel --prod        # Deploy a producción
```

---

## 8. Historial de Sincronización

| Fecha | Acción | Resultado |
|-------|--------|-----------|
| 2026-03-27 | Clone desde GitHub | ✅ 100% completado |
| 2026-03-27 | Sync al workspace | ✅ Sin conflictos críticos |
| 2026-03-27 | `npm install` | ✅ 350 paquetes — 2 vulns leves |
| 2026-03-27 | Generación de `init.sh` | ✅ Creado |
