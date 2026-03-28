# i18n Extraction — Scraping Summary

**Sprint 1 · Signalia Landing · Completado el 2026-03-28**

---

## Resultado del build

```
✓ Compiled successfully in 3.7s     (TypeScript: 0 errores)
✓ Generating static pages (6/6)
○  /   →  prerendered as static content
Build exit code: 0
```

---

## Métricas de extracción

| Métrica | Valor |
|---|---|
| Archivo origen | `app/page.tsx` (901 líneas → 649 líneas refactorizadas) |
| Líneas eliminadas del componente | **252 líneas** (el objeto `translations` inline) |
| Keys de traducción (hojas JSON) | **135 keys** |
| Strings individuales extraídos | **164 por idioma × 2 = 328 strings totales** |
| Llamadas `t()` / `t.raw()` en page.tsx | **133** |
| Cobertura de strings hardcodeados | **100 %** |

---

## Archivos creados / modificados

| Archivo | Tipo | Descripción |
|---|---|---|
| `messages/es.json` | ✅ Nuevo | 164 strings en español, 11 secciones |
| `messages/en.json` | ✅ Nuevo | 164 strings en inglés premium (estilo ScreenCloud/OptiSigns) |
| `app/page.tsx` | ✅ Modificado | Refactorizado con `useTranslations` + `NextIntlClientProvider` |
| `package.json` | ✅ Modificado | Añadida dependencia `next-intl@^4.8.3` |

---

## Strings extraídos por sección

| Sección | Keys | Strings | Cobertura |
|---|---|---|---|
| `nav` | 12 | 12 | ✅ 100% |
| `hero` | 19 | 19 | ✅ 100% |
| `services` | 22 | 22 | ✅ 100% |
| `process` | 9 | 9 | ✅ 100% |
| `results` | 10 | 10 | ✅ 100% |
| `personas` | 19 | 19 | ✅ 100% |
| `trust` | 2 | 6 (1 array × 5 items) | ✅ 100% |
| `pricing` | 22 | 39 (3 arrays de features) | ✅ 100% |
| `faq` | 3 | 14 (1 array × 6 q/a) | ✅ 100% |
| `cta` | 5 | 5 | ✅ 100% |
| `footer` | 12 | 12 | ✅ 100% |
| **TOTAL** | **135** | **164** | **✅ 100%** |

---

## Convención de nombres usada

```
[seccion].[elemento].[propiedad]
```

**Ejemplos:**
- `hero.title.line1` → "Tu señal más fuerte"
- `services.signal.features.optimization` → "Optimización completa de Google Business Profile"
- `pricing.combo.popular` → "Más popular" / "Most popular"
- `faq.items` → array de 6 objetos `{ question, answer }`
- `nav.lang.menuAriaLabel` → "Menu" (aria-label accesibilidad)

---

## Arquitectura de traducción implementada

```
page.tsx
  └─ Home (Client Component)              ← gestiona estado: lang, menuOpen, scrolled
       └─ NextIntlClientProvider           ← provee locale + messages al árbol
            └─ HomeContent               ← consume useTranslations()
                 ├─ t("nav.links.services")
                 ├─ t.raw("faq.items")    ← arrays tipados
                 ├─ t.raw("trust.items")
                 ├─ t.raw("pricing.*.features")
                 └─ ... 133 llamadas totales
```

**Patrón utilizado:** `NextIntlClientProvider` sin routing de URL — preserva el language switcher
client-side existente (`useState<"es" | "en">`). Compatible con next-intl v4 y Next.js 16.

---

## Strings NO extraídos (intencional)

Los siguientes strings se mantienen hardcodeados porque son **datos de contacto / URLs / brand names**,
no contenido textual traducible:

| String | Razón |
|---|---|
| `SIGNALIA` (logo) | Nombre de marca invariable |
| `hola@signalia.com.mx` | Email de contacto |
| `signalia.com.mx` | URL |
| `https://cal.com/signalia` | URL de calendario |
| `https://wa.me/1234567890` | URL de WhatsApp |
| `Instagram`, `LinkedIn` | aria-labels de redes sociales (nombres de marca) |

---

## Checklist final

- [x] Todos los strings visibles del usuario pasan por `t()`
- [x] Cada key existe en `messages/es.json`
- [x] Cada key existe en `messages/en.json` con traducción premium
- [x] Sin keys duplicados
- [x] `useTranslations` importado y configurado correctamente
- [x] Naturaleza Client Component respetada (`"use client"`)
- [x] `npm run build` → exit code 0, TypeScript limpio
- [x] 0 lógica de negocio eliminada (solo extracción de contenido)
