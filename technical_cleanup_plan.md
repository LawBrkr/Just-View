# Signalia — Technical Cleanup Plan
**Date:** March 28, 2026 · **Node Version:** 24.x · **Framework:** Next.js 16.2.1 + React 19
**Goal:** Optimize for Core Web Vitals (LCP < 1.2s), reduce bundle size, and leverage Node 24 native APIs.

---

## Current State Audit

### Stack Snapshot
| Component | Version | Status |
|---|---|---|
| Next.js | 16.2.1 | ✅ Latest — App Router, Turbopack |
| React | 19.2.4 | ✅ Latest |
| Node.js (Vercel) | 24.x | ✅ Latest LTS |
| TypeScript | ^5 | ✅ |
| Bundler | Turbopack (default) | ✅ |
| CSS Strategy | CSS Modules + CSS Variables | ✅ Zero-dependency |

### Code Metrics
| File | Lines | Size |
|---|---|---|
| `app/page.tsx` | 901 | ~45 KB (monolithic) |
| `app/page.module.css` | 1,282 | ~23 KB |
| `app/globals.css` | 327 | ~7 KB |
| `node_modules/` | 394 packages | 416 MB |
| `.next/` (build output) | — | 213 MB |

### Key Findings
1. **Monolithic page.tsx** — 901 lines in a single `"use client"` component. The entire page is client-rendered, including static content (translations, structured data, FAQ content).
2. **No `next.config.ts` optimizations** — Config file is empty, missing image optimization, headers, redirects, and performance tuning.
3. **3 external font requests** — Google Fonts (DM Sans + JetBrains Mono) + Fontshare (General Sans). Each adds render-blocking latency.
4. **No dynamic imports or code splitting** — Everything loads upfront.
5. **`"use client"` at top level** — Prevents React Server Components (RSC) from handling static content server-side.

---

## PHASE A: Node 24 Native API Opportunities

Node 24 introduces several native APIs that can replace dependencies or simplify code:

### A1. Native `fetch` (already available)
- **Status:** ✅ Already used implicitly by Next.js 16. No `node-fetch` or `axios` in dependencies.
- **Action:** No change needed — clean.

### A2. `node:test` for future testing
- **Status:** No test framework currently installed (no jest, vitest, etc.)
- **Recommendation:** When tests are added, use `node:test` + `node:assert` instead of installing Jest or Vitest. This saves ~50MB of `node_modules` for a landing page project.

### A3. TypeScript target upgrade
- **Current:** `tsconfig.json` targets `ES2017`
- **Recommendation:** Upgrade to `ES2022` or `ESNext` since Node 24 and all modern browsers support it. This enables:
  - Top-level `await`
  - `Array.at()`, `Object.hasOwn()`
  - Smaller transpilation output (less polyfill code)

```json
// tsconfig.json change
"target": "ES2022"  // was ES2017
```

### A4. Native `structuredClone` / `crypto.randomUUID`
- **Not currently needed** but good to know: if the project adds data handling, avoid lodash `_.cloneDeep` in favor of native `structuredClone()`.

---

## PHASE B: Core Web Vitals Optimization (LCP < 1.2s)

### B1. 🔴 CRITICAL — Split `page.tsx` into Server + Client Components

The single biggest performance win. Currently, the entire 901-line page is client-rendered (`"use client"`), which means:
- Zero SSR benefit from React Server Components
- Entire translation object (~300 lines) is shipped to the client as JS
- JSON-LD structured data is injected client-side (bad for SEO)

**Proposed architecture:**

```
app/
├── page.tsx              ← Server Component (static shell, SEO, JSON-LD)
├── components/
│   ├── Navbar.tsx        ← Client (scroll state, menu toggle, lang)
│   ├── Hero.tsx          ← Client (animations, counters)
│   ├── Services.tsx      ← Server (static content)
│   ├── Process.tsx       ← Server (static content)
│   ├── Results.tsx       ← Client (animated counters)
│   ├── Personas.tsx      ← Server (static content)
│   ├── Pricing.tsx       ← Server (static content)
│   ├── FAQ.tsx           ← Client (accordion interactivity)
│   ├── CTASection.tsx    ← Server (static)
│   └── Footer.tsx        ← Server (static)
```

**Impact:**
- ~60% of the page becomes server-rendered HTML (zero JS sent for static sections)
- LCP improves because the browser gets HTML immediately instead of waiting for JS hydration
- Time to Interactive (TTI) drops significantly

### B2. 🟡 HIGH — Font Loading Strategy

**Current problem:** 3 separate font requests (2 to Google Fonts, 1 to Fontshare) block rendering.

**Fix:**

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
};
```

And use `next/font` for self-hosting:

```typescript
// app/layout.tsx — use next/font/google for DM Sans & JetBrains Mono
import { DM_Sans, JetBrains_Mono } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-body' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
```

For General Sans (Fontshare), use `next/font/local` with self-hosted files.

**Impact:** Eliminates 2-3 render-blocking requests. Fonts served from same origin. FOUT/FOIT eliminated. ~200ms LCP improvement.

### B3. 🟡 HIGH — Optimize `next.config.ts`

The config is currently empty. Add:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compress responses
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Security + performance headers
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/(.*)\\.(js|css|woff2|avif|webp|png|jpg|svg)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],

  // Vercel Edge optimization
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
```

### B4. 🟢 MEDIUM — Preload Critical Assets

In `layout.tsx`, add preload hints:

```html
<link rel="preload" href="/icon.svg" as="image" type="image/svg+xml" />
<link rel="dns-prefetch" href="https://cal.com" />
```

---

## PHASE C: Bundle Size & Dead Code

### C1. Dependency Audit — What's Actually Shipped

| Package | Install Size | Ships to Client? | Status |
|---|---|---|---|
| `next` | 159 MB (install) | ~90 KB (runtime) | ✅ Required |
| `react` + `react-dom` | 7.3 MB (install) | ~45 KB (runtime) | ✅ Required |
| `typescript` | 23 MB | ❌ Dev only | ✅ OK |
| `@img/*` | 20 MB | ❌ Build only (sharp) | ✅ OK |
| `eslint` + plugins | ~18 MB total | ❌ Dev only | ✅ OK |
| `es-abstract` | 5.9 MB | ❌ Transitive dep | ⚠️ Heavy for what it does |
| `zod` | 5.3 MB | ❌ Transitive dep | ⚠️ Not used directly |
| `axe-core` | 2.9 MB | ❌ Dev only (a11y) | ✅ OK |

**Verdict:** The production dependencies are already minimal (only `next`, `react`, `react-dom`). The 416MB `node_modules` is mostly dev/build tooling. **No action needed on dependency removal.**

### C2. Dead Code in CSS

The `page.module.css` file (1,282 lines) likely contains unused selectors, especially if the page is refactored into components. After the B1 refactor:

**Action:** Run PurgeCSS or use Next.js built-in CSS tree-shaking to verify all selectors are used.

### C3. Translation Object — Dead Weight in JS Bundle

The translations object (~300 lines, both `es` and `en`) is shipped entirely to the client. A user viewing in Spanish still downloads all English strings and vice versa.

**Fix options (in order of preference):**
1. **Move translations to separate JSON files** and load per-locale using Next.js i18n routing
2. **Use `next-intl` or similar** — lightweight i18n with server-side locale detection
3. **Minimum viable:** Dynamic import of translation objects:
   ```typescript
   const translations = await import(`./translations/${lang}.json`);
   ```

### C4. JSON-LD — Move to Server Component

Currently injected via `dangerouslySetInnerHTML` on the client. This is wasted client JS. Move to the server component or use Next.js `metadata` API:

```typescript
// app/page.tsx (Server Component)
export const metadata = {
  other: {
    'application/ld+json': JSON.stringify(jsonLd),
  },
};
```

---

## PHASE D: Vercel Edge Runtime & Latency Optimization

### D1. Region Configuration

**Current:** Vercel auto-assigns the deployment region (likely `iad1` — US East).

**Recommendation:** For a Mexico City-focused business serving both MX and US audiences:

```json
// vercel.json (create new file)
{
  "regions": ["iad1", "gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "CDN-Cache-Control",
          "value": "public, s-maxage=86400, stale-while-revalidate=604800"
        }
      ]
    }
  ]
}
```

- `iad1` (Washington DC) — serves US traffic with ~30ms latency to most US cities
- `gru1` (São Paulo) — serves MX/LATAM traffic with ~60ms latency to CDMX (closest region to Mexico)

### D2. Edge Middleware (Optional)

For geo-based language detection:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'MX';
  // Set default lang based on geo
  const response = NextResponse.next();
  response.headers.set('x-detected-country', country);
  return response;
}

export const config = { matcher: '/' };
```

### D3. Static Generation

Since this is a landing page with no dynamic data, ensure it's statically generated:

```typescript
// app/page.tsx
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate daily
```

---

## Priority Matrix

| # | Task | Impact | Effort | Priority |
|---|---|---|---|---|
| B1 | Split page into Server + Client components | 🔴 Critical (LCP -40%) | Medium (4-6 hrs) | **P0** |
| B2 | Self-host fonts with `next/font` | 🟡 High (LCP -200ms) | Low (1 hr) | **P0** |
| B3 | Populate `next.config.ts` | 🟡 High (headers, cache) | Low (30 min) | **P0** |
| D1 | Add `vercel.json` regions | 🟡 High (latency MX) | Low (15 min) | **P1** |
| C3 | Extract translations to JSON | 🟢 Medium (bundle size) | Low (1 hr) | **P1** |
| A3 | Upgrade TS target to ES2022 | 🟢 Medium (smaller output) | Low (5 min) | **P1** |
| C4 | Move JSON-LD to server | 🟢 Medium (SEO + size) | Low (15 min) | **P2** |
| D3 | Force static generation | 🟢 Medium (TTFB) | Low (5 min) | **P2** |
| D2 | Edge middleware for geo-lang | 🔵 Low (UX) | Medium (2 hrs) | **P3** |
| C2 | CSS dead code audit | 🔵 Low (post-refactor) | Low (30 min) | **P3** |

---

## Expected Results After Cleanup

| Metric | Current (Est.) | After Cleanup | Delta |
|---|---|---|---|
| LCP | ~2.5s | < 1.2s | **-52%** |
| FCP | ~1.8s | < 0.8s | **-55%** |
| TTI | ~3.5s | < 1.5s | **-57%** |
| JS Bundle (client) | ~180 KB | ~70 KB | **-61%** |
| Font Requests | 3 (external) | 0 (self-hosted) | **-100%** |
| Lighthouse Score | ~75 | 95+ | **+27%** |

---

*All changes are proposals — no code has been modified. Awaiting Mando's approval before implementation.*
