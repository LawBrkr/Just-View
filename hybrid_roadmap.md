# Signalia — Hybrid Roadmap: Dark Premium Hero Interactivo
**Date:** March 28, 2026 · **Sprint:** Pre-Ads Campaign
**Premise:** Combine the competitive intelligence (Phase 1) with the technical cleanup (Phase 2) into an actionable implementation plan.

---

## The Vision

A **dark-mode hero section** with Signalia's indigo-to-violeta gradient, featuring a **live-animated "GBP Dashboard"** that simulates real metrics growing in real time. The user lands on the page and immediately sees what Signalia does — not through words, but through a visual proof that their business metrics can grow like the animation shows.

Think: ScreenCloud's cinematic dark gradients + OptiSigns' animated SVGs + a Stripe-level data visualization — all wrapped in Signalia's existing brand palette.

---

## Architecture: "Dark Premium" Base

### Color System Transformation

The current Signalia palette already has the building blocks. The shift is from a light `--crema` background to a dark `--indigo` base for the hero:

```
CURRENT HERO                          TARGET HERO
─────────────                         ────────────
Background: #F5F4F0 (crema)    →     Background: linear-gradient(135deg, #1a1945 0%, #2D2B6B 40%, #534AB7 100%)
Text: #2C2C2A (carbon)         →     Text: #FFFFFF (inverse)
Accent: #534AB7 (violeta)      →     Accent: #1D9E75 (verde) — pops on dark
Cards: #FFFFFF                  →     Cards: rgba(255,255,255,0.06) + backdrop-blur(20px)
Shadows: rgba(45,43,107,0.08)  →     Shadows: rgba(0,0,0,0.3) + glow: rgba(83,74,183,0.25)
```

### Typography on Dark

- Headlines: `General Sans 700` in white with subtle text-shadow for depth
- Subheadings: `DM Sans 400` in `rgba(255,255,255,0.75)` for hierarchy
- Badges/labels: `JetBrains Mono 600` in `--verde` (#1D9E75) — the "tech signal"
- The logo "SIGNALIA" in the nav goes white on the dark hero, transitions to indigo when scrolled past

### Glassmorphism Layer

Cards and interactive elements within the hero use:
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 16px;
```

This creates the "premium depth" effect that ScreenCloud uses — elements float above the gradient.

---

## The Interactive Hero: "Live Dashboard"

### Concept

The right side of the hero (desktop) / below headline (mobile) shows an animated mock-up of a Google Business Profile dashboard. It's NOT a screenshot — it's a purpose-built SVG/CSS component that animates:

```
┌─────────────────────────────────────────────────────┐
│  ┌─── Hero Left ───────┐  ┌─── Hero Right ─────────┐│
│  │                      │  │  ╔═══════════════════╗  ││
│  │  [Tech · CDMX]       │  │  ║  📊 GBP Dashboard ║  ││
│  │                      │  │  ╠═══════════════════╣  ││
│  │  Tu señal más        │  │  ║  Searches ▓▓▓▓░ +450%║││
│  │  fuerte en lo        │  │  ║  Clicks   ▓▓▓░░ +280%║││
│  │  digital.            │  │  ║  Calls    ▓▓░░░ +180%║││
│  │                      │  │  ║                     ║  ││
│  │  [Subtitle text]     │  │  ║  ⬆ Last 30 days    ║  ││
│  │                      │  │  ║  ● Polanco · Roma   ║  ││
│  │  [CTA1] [CTA2]       │  │  ╚═══════════════════╝  ││
│  │                      │  │                          ││
│  │  [Stats bar: 3 cols] │  │  [Trust: G★ 4.9 rating] ││
│  └──────────────────────┘  └──────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Animation Sequence (on page load)

1. **0ms** — Dark gradient background fades in
2. **200ms** — Hero orbs begin subtle floating animation (already exists)
3. **400ms** — Headline text fades in from bottom (`fadeInUp`)
4. **600ms** — Dashboard card slides in from right (`slideInRight`) with glassmorphism
5. **800ms** — Bar chart bars animate from 0% to final width (staggered: 800ms, 1000ms, 1200ms)
6. **1400ms** — Percentage counters count up (reuse existing `useCounter` hook)
7. **1800ms** — Green "Growing ↑" badge pulses once
8. **2200ms** — CTA buttons fade in with subtle bounce

### Technical Implementation

The dashboard is a **pure CSS/SVG component** — no external libraries:

```tsx
// components/HeroDashboard.tsx — Client Component
"use client";
import { useCounter } from '@/hooks/useCounter';

export function HeroDashboard() {
  const searches = useCounter(450, 2000, '%');
  const clicks = useCounter(280, 1800, '%');
  const calls = useCounter(180, 1600, '%');

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <span className={styles.dashboardDot} />
        GBP Performance
      </div>
      <div className={styles.dashboardBars}>
        <DashboardBar label="Searches" value={searches} delay={0} color="verde" />
        <DashboardBar label="Clicks" value={clicks} delay={200} color="violeta" />
        <DashboardBar label="Calls" value={calls} delay={400} color="lavanda" />
      </div>
      <div className={styles.dashboardFooter}>
        <span>Last 30 days</span>
        <span className={styles.growing}>↑ Growing</span>
      </div>
    </div>
  );
}
```

**Zero additional dependencies.** Pure React 19 + CSS animations + existing hooks.

---

## Implementation Sprints

### Sprint 1: Technical Foundation (Week 1)
**Goal:** Performance base before visual changes

| Day | Task | Owner |
|---|---|---|
| Mon | Split `page.tsx` into Server + Client components (P0 from cleanup plan) | Dev |
| Tue | Self-host fonts with `next/font` + remove external font imports | Dev |
| Wed | Populate `next.config.ts` (compression, headers, image opts) | Dev |
| Wed | Create `vercel.json` with region config (iad1 + gru1) | Dev |
| Thu | Extract translations to separate JSON files per locale | Dev |
| Fri | Lighthouse audit — verify LCP < 1.5s baseline | QA |

**Exit criteria:** Lighthouse Performance score ≥ 90 on both mobile and desktop.

### Sprint 2: Dark Hero Implementation (Week 2)
**Goal:** Build and ship the new hero section

| Day | Task | Owner |
|---|---|---|
| Mon | Create CSS custom properties for dark hero theme (extends existing tokens) | Dev |
| Mon | Build `HeroDashboard.tsx` component with animated bars | Dev |
| Tue | Refactor hero layout: two-column (text left, dashboard right) | Dev |
| Tue | Implement glassmorphism card styles for dashboard | Dev |
| Wed | Add animation sequence (staggered fadeIn + counter hooks) | Dev |
| Wed | Mobile responsive: dashboard stacks below headline on <768px | Dev |
| Thu | Dark-to-light transition: hero is dark, sections below remain light (smooth gradient edge) | Dev |
| Thu | Update navbar: white text on hero, transitions on scroll | Dev |
| Fri | Cross-browser testing (Safari backdrop-filter, Firefox, mobile Chrome) | QA |

**Exit criteria:** Hero renders identically on Chrome, Safari, Firefox. LCP < 1.2s. No CLS shift.

### Sprint 3: Conversion Optimization (Week 3)
**Goal:** Apply competitive patterns that drive conversions

| Day | Task | Owner |
|---|---|---|
| Mon | Add social proof above fold (Google rating badge + neighborhood counter) | Dev |
| Mon | Implement tab-based Signal/Alia service toggle (inspired by Yodeck) | Dev |
| Tue | Record 30-second GBP walkthrough video, embed with lazy loading | Content |
| Wed | Add "No compromiso" trust signals near CTAs (inspired by OptiSigns) | Dev |
| Wed | Implement scroll-snap for main sections (inspired by ScreenCloud) | Dev |
| Thu | A/B test setup: current hero vs. new dark hero (Vercel Edge Config) | Dev |
| Fri | Final Lighthouse + PageSpeed Insights audit | QA |

**Exit criteria:** All Core Web Vitals green. A/B test infrastructure ready. Ads landing page URL verified.

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Dark hero reduces readability on low-contrast screens | Medium | High | Test with WCAG AA contrast checker. Hero text must be ≥ 4.5:1 ratio on gradient |
| `backdrop-filter` not supported on old Android browsers | Low | Medium | Fallback: solid `rgba(26,25,69,0.95)` background for unsupported browsers |
| Animation overhead on low-end mobile devices | Medium | Medium | Use `prefers-reduced-motion` media query to disable animations. Keep all animations CSS-only (no JS-driven) |
| Dark hero feels "disconnected" from light body sections | Medium | Low | Use a gradient transition zone (dark → crema) between hero and first section. 120px height, smooth gradient. |

---

## Success Metrics (30 days post-launch)

| KPI | Target | Measurement |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 95 | PageSpeed Insights |
| LCP | < 1.2s | Core Web Vitals (CrUX) |
| CLS | < 0.05 | Core Web Vitals |
| Bounce Rate (from Ads) | < 35% | Google Analytics 4 |
| Demo Booking Rate | ≥ 8% of landing page visitors | Cal.com conversion tracking |
| Time on Page | > 45 seconds | GA4 |
| Scroll Depth | > 60% reach pricing section | GA4 scroll tracking |

---

## What This Achieves

**Before:** A clean but generic light-mode landing page that looks like every Squarespace consultancy site. Blends in with Mexican competitors. Doesn't communicate "premium tech" at first glance.

**After:** A dark, cinematic, data-driven hero that immediately communicates: "We are the Silicon Valley-grade tech consultancy for CDMX businesses." The animated dashboard is both the aesthetic statement and the product proof — visitors see their potential results before reading a single word.

The rest of the page remains light-mode (crema background) for readability, creating a natural contrast that makes the hero even more memorable. This is the "Apple approach" — dark hero for impact, light body for content.

---

*This roadmap is a proposal. No code changes have been applied. All sprints are scoped for a single developer + content creator. Ready for Mando's review and approval.*
