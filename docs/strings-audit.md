# Strings Audit — `app/page.tsx`

**Sprint:** 1 · Baseline
**Date:** 2026-03-28
**Source file:** `signalia-landing/app/page.tsx`
**Method:** All string literals NOT resolved through the `dict` / `messages` i18n object.

---

## Summary

| Category | Count | Status |
|---|---|---|
| JSON-LD business data | 13 | Hardcoded — intentional (SEO) |
| Config / runtime | 3 | Hardcoded — intentional |
| WhatsApp CTA | 1 | **Placeholder — needs real number** |
| Aria / accessibility | 1 | Hardcoded — candidate for i18n |
| HTML structure (anchor, id) | 2 | Hardcoded — intentional |

---

## JSON-LD Structured Data (lines 30–51)

These strings live inside the `jsonLd` object passed to `<script type="application/ld+json">`. They are intentionally hardcoded for SEO/schema.org purposes and should change only when business info changes.

| Line | String | Field | Notes |
|---|---|---|---|
| 31 | `"https://schema.org"` | `@context` | Schema.org spec — do not change |
| 32 | `"LocalBusiness"` | `@type` | Schema.org type — do not change |
| 33 | `"Signalia"` | `name` | Business name |
| 34 | `"Consultoría tech — Visibilidad digital + automatización IA para PyMEs en CDMX"` | `description` | Business description |
| 35 | `"https://signalia.com.mx"` | `url` | Canonical URL |
| 36 | `"hola@signalia.com.mx"` | `email` | Contact email |
| 38 | `"City"` | `areaServed.@type` | Schema.org type — do not change |
| 39 | `"Ciudad de México"` | `areaServed.name` | Primary service city |
| 42–47 | `"Polanco"`, `"Condesa"`, `"Roma"`, `"Coyoacán"`, `"Del Valle"`, `"Santa Fe"` | `serviceArea[].name` | Neighborhood list |
| 49 | `["es", "en"]` | `knowsLanguage` | Supported locales |
| 50 | `"$$"` | `priceRange` | Schema.org price range |

---

## Config / Runtime (lines 25, 54)

| Line | String | Usage | Notes |
|---|---|---|---|
| 25 | `"es"` | Fallback locale for `NEXT_LOCALE` cookie | Default language |
| 54 | `"America/Mexico_City"` | `timeZone` prop on `<ClientIntlProvider>` | IANA timezone — update if expanding regions |

---

## WhatsApp CTA (line 112)

| Line | String | Usage | Status |
|---|---|---|---|
| 112 | `"https://wa.me/1234567890"` | Floating WhatsApp button `href` | **PLACEHOLDER — replace with real number before launch** |

---

## Accessibility (line 112)

| Line | String | Usage | Notes |
|---|---|---|---|
| 112 | `"WhatsApp"` | `aria-label` on floating button | Candidate for i18n if English/Spanish labels differ |

---

## HTML Structure (lines 62, 69)

| Line | String | Usage | Notes |
|---|---|---|---|
| 62 | `"#main-content"` | Skip-link `href` | Must stay in sync with id on line 69 |
| 69 | `"main-content"` | `<main id="...">` | Anchor target — do not change without updating line 62 |

---

## Action Items

1. **Replace** `https://wa.me/1234567890` with the real WhatsApp business number before Sprint 2.
2. **Consider** moving `description` (line 34) and `email` (line 36) to a single `config/business.ts` constant so JSON-LD and any other metadata stay in sync.
3. **Low priority:** Add `"WhatsApp"` aria-label to translation files if bilingual accessibility is required.
