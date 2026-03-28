# Manifiesto de Componentes - Fase B1

Estructura de la arquitectura híbrida implementada en el proyecto tras la separación de `app/page.tsx` en múltiples componentes estáticos y de cliente.

## Estructura de `app/components/`

- **ClientIntlProvider.tsx** (Client Component): `367 bytes` (Wrapper de NextIntl para App Router)
- **CTASection.tsx** (Server Component): `1431 bytes`
- **FAQ.tsx** (Client Component): `1435 bytes`
- **Footer.tsx** (Server Component): `2976 bytes`
- **Hero.tsx** (Client Component): `3624 bytes`
- **Navbar.tsx** (Client Component): `3569 bytes`
- **Personas.tsx** (Server Component): `2354 bytes`
- **Pricing.tsx** (Server Component): `2700 bytes`
- **Process.tsx** (Server Component): `1451 bytes`
- **Results.tsx** (Client Component): `2979 bytes`
- **Services.tsx** (Server Component): `3149 bytes`

## Archivos Modificados en Raíz

- **app/page.tsx**: Transformado de Client Component gigante a Server Component de `4495 bytes`. Ahora actúa como "cascarón estático", inyecta el JSON-LD para SEO y lee el idioma nativamente desde `cookies("NEXT_LOCALE")`.
- **i18n/request.ts**: (Nuevo) `175 bytes`. Archivo insertado para solucionar la dependencia estricta de configuración de `next-intl` App Router en entornos de renderizado de servidor.
