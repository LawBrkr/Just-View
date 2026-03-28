#!/usr/bin/env node
/**
 * Signalia — Lighthouse Baseline Audit
 * ─────────────────────────────────────
 * Hybrid Roadmap · Sprint Pre-Ads Campaign
 *
 * Flujo:
 *   1. next build         → verifica que el bundle de prod esté limpio
 *   2. next start         → levanta servidor en :3000
 *   3. npx lighthouse     → auditoría headless (Chrome)
 *   4. parse + extrae     → guarda métricas clave en docs/baseline.json
 *
 * Targets del Roadmap:
 *   Performance  ≥ 95
 *   LCP          < 1 200 ms
 *   CLS          < 0.05
 *   FCP          < 1 500 ms
 *   TBT          < 200 ms
 *
 * Uso:
 *   npm run lighthouse
 *   npm run lighthouse -- --mobile   (flag futuro: perfil móvil)
 */

import { execSync, spawn } from 'node:child_process';
import {
  writeFileSync, readFileSync,
  mkdirSync, unlinkSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath }  from 'node:url';
import http from 'node:http';

/* ── Rutas ──────────────────────────────────────────────── */
const __dirname   = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');              // signalia-landing/
const DOCS_DIR     = join(PROJECT_ROOT, '..', 'docs');  // Signalia/docs/
const OUTPUT_FILE  = join(DOCS_DIR, 'baseline.json');
const TMP_REPORT   = join(DOCS_DIR, '_lh_tmp.json');
const TARGET_URL   = 'http://localhost:3000';
const PORT         = 3000;

/* ── ANSI ───────────────────────────────────────────────── */
const C = {
  reset:  '\x1b[0m',  bold: '\x1b[1m',   dim:    '\x1b[2m',
  cyan:   '\x1b[36m', green: '\x1b[32m', yellow: '\x1b[33m',
  red:    '\x1b[31m', blue:  '\x1b[34m', white:  '\x1b[37m',
};

const section = (t) =>
  console.log(`\n${C.bold}${C.blue}── ${t} ──${C.reset}`);
const pass = (m) => console.log(`${C.green}✓ ${m}${C.reset}`);
const fail = (m) => console.log(`${C.red}✗ ${m}${C.reset}`);
const info = (m) => console.log(`${C.cyan}→ ${m}${C.reset}`);

/* ── Targets del Hybrid Roadmap ─────────────────────────── */
const TARGETS = {
  performance: { min: 95,   label: '≥ 95',        type: 'min' },
  lcp:         { max: 1200, label: '< 1 200 ms',  type: 'max' },
  cls:         { max: 0.05, label: '< 0.05',      type: 'max' },
  fcp:         { max: 1500, label: '< 1 500 ms',  type: 'max' },
  tbt:         { max: 200,  label: '< 200 ms',    type: 'max' },
};

/* ── Helpers ────────────────────────────────────────────── */
function waitForPort(port, timeoutMs = 45_000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeoutMs;
    (function poll() {
      http.get(`http://localhost:${port}`, () => resolve())
        .on('error', () => {
          if (Date.now() > deadline)
            reject(new Error(`Servidor no respondió en ${timeoutMs / 1000}s`));
          else setTimeout(poll, 600);
        });
    })();
  });
}

function statusBadge(value, target) {
  let ok = false;
  if (target.type === 'max') ok = value <= target.max;
  if (target.type === 'min') ok = value >= target.min;
  return ok ? `${C.green}PASS${C.reset}` : `${C.red}FAIL${C.reset}`;
}

function printMetricRow(name, displayValue, numericValue, target) {
  const badge = target ? statusBadge(numericValue, target) : `${C.dim}  ──${C.reset}`;
  const padded = name.padEnd(16);
  const val    = displayValue.padStart(12);
  const tgt    = target ? `  target ${target.label}` : '';
  console.log(`  ${C.dim}${padded}${C.reset}${val}${C.dim}${tgt}${C.reset}  ${badge}`);
}

function extractAudit(audits, key) {
  const a = audits[key];
  if (!a) return { value: null, display: 'N/A', score: null };
  return {
    value:   a.numericValue  ?? null,
    display: a.displayValue  ?? String(a.numericValue),
    score:   a.score         ?? null,
  };
}

/* ── Main ───────────────────────────────────────────────── */
async function main() {
  console.log(
    `\n${C.bold}${C.cyan}` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `   Signalia · Lighthouse Baseline Audit\n` +
    `   Hybrid Roadmap — Sprint Pre-Ads Campaign\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━` +
    `${C.reset}\n`,
  );

  mkdirSync(DOCS_DIR, { recursive: true });
  const IS_WIN = process.platform === 'win32';

  /* 1. Build ─────────────────────────────────────────────── */
  section('1 / 4  next build');
  try {
    execSync('npm run build', {
      cwd:   PROJECT_ROOT,
      stdio: 'inherit',
      shell: IS_WIN,
    });
    pass('Build completado');
  } catch {
    fail('next build falló — abortando');
    process.exit(1);
  }

  /* 2. Start ─────────────────────────────────────────────── */
  section('2 / 4  next start :3000');
  info('Levantando servidor de producción...');

  const server = spawn('npm', ['run', 'start'], {
    cwd:   PROJECT_ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: IS_WIN,
  });

  server.on('error', (e) => {
    fail(`No se pudo iniciar el servidor: ${e.message}`);
    process.exit(1);
  });

  process.on('exit', () => server.kill('SIGTERM'));
  process.on('SIGINT', () => { server.kill('SIGTERM'); process.exit(0); });

  try {
    await waitForPort(PORT);
    pass('Servidor listo en http://localhost:3000');
  } catch (e) {
    fail(e.message);
    server.kill('SIGTERM');
    process.exit(1);
  }

  /* 3. Lighthouse ─────────────────────────────────────────── */
  section('3 / 4  Lighthouse headless');
  info(`Auditando ${TARGET_URL}...`);
  info('Requiere Google Chrome instalado.');

  const npx = IS_WIN ? 'npx.cmd' : 'npx';
  const chromeFlags = [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ].join(' ');

  const lhCmd = [
    npx, '--yes', 'lighthouse@12',
    TARGET_URL,
    `--output=json`,
    `--output-path="${TMP_REPORT}"`,
    '--only-categories=performance',
    `--chrome-flags="${chromeFlags}"`,
    '--quiet',
  ].join(' ');

  try {
    execSync(lhCmd, {
      cwd:   PROJECT_ROOT,
      stdio: 'inherit',
      shell: IS_WIN || true,  // shell=true para manejar comillas en --chrome-flags
    });
    pass('Auditoría Lighthouse completada');
  } catch {
    fail('Lighthouse falló. ¿Está Chrome instalado y accesible?');
    server.kill('SIGTERM');
    process.exit(1);
  }

  /* 4. Parse + save ──────────────────────────────────────── */
  section('4 / 4  Parsear resultados → docs/baseline.json');

  const raw        = JSON.parse(readFileSync(TMP_REPORT, 'utf8'));
  const audits     = raw.audits;
  const categories = raw.categories;

  const perfScore = Math.round((categories.performance?.score ?? 0) * 100);

  const lcp = extractAudit(audits, 'largest-contentful-paint');
  const cls = extractAudit(audits, 'cumulative-layout-shift');
  const fcp = extractAudit(audits, 'first-contentful-paint');
  const tbt = extractAudit(audits, 'total-blocking-time');
  const si  = extractAudit(audits, 'speed-index');
  const tti = extractAudit(audits, 'interactive');

  /* ── Estructura final del baseline ── */
  const baseline = {
    _meta: {
      description: 'Signalia Lighthouse baseline — auto-generated',
      script:      'scripts/lighthouse-baseline.mjs',
      roadmap:     'Hybrid Roadmap — Dark Premium Hero Sprint',
      timestamp:   new Date().toISOString(),
      url:         TARGET_URL,
    },
    scores: {
      performance: perfScore,
    },
    metrics: {
      lcp: { value: Math.round(lcp.value ?? 0), displayValue: lcp.display, unit: 'ms' },
      cls: { value: parseFloat((cls.value ?? 0).toFixed(4)), displayValue: cls.display, unit: '' },
      fcp: { value: Math.round(fcp.value ?? 0), displayValue: fcp.display, unit: 'ms' },
      tbt: { value: Math.round(tbt.value ?? 0), displayValue: tbt.display, unit: 'ms' },
      si:  { value: Math.round(si.value  ?? 0), displayValue: si.display,  unit: 'ms' },
      tti: { value: Math.round(tti.value ?? 0), displayValue: tti.display, unit: 'ms' },
    },
    targets: {
      performance: TARGETS.performance.label,
      lcp:         TARGETS.lcp.label,
      cls:         TARGETS.cls.label,
      fcp:         TARGETS.fcp.label,
      tbt:         TARGETS.tbt.label,
    },
    _context: {
      sprint:    'Sprint 1 — baseline pre dark-hero',
      next_step: 'Sprint 2 — implementar dark hero, re-ejecutar y comparar contra estos valores',
    },
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(baseline, null, 2), 'utf8');

  /* limpia tmp */
  try { unlinkSync(TMP_REPORT); } catch { /* noop */ }

  /* ── Resumen en consola ── */
  const perfColor = perfScore >= 95 ? C.green : perfScore >= 80 ? C.yellow : C.red;
  console.log(
    `\n  ${C.bold}Performance  ${perfColor}${perfScore}${C.reset}${C.bold} / 100` +
    `  (target ${TARGETS.performance.label})${C.reset}\n`,
  );

  printMetricRow('LCP', lcp.display, lcp.value ?? 0, TARGETS.lcp);
  printMetricRow('CLS', cls.display, cls.value ?? 0, TARGETS.cls);
  printMetricRow('FCP', fcp.display, fcp.value ?? 0, TARGETS.fcp);
  printMetricRow('TBT', tbt.display, tbt.value ?? 0, TARGETS.tbt);
  printMetricRow('Speed Index', si.display,  si.value  ?? 0, null);
  printMetricRow('TTI',         tti.display, tti.value ?? 0, null);

  console.log(
    `\n  ${C.dim}Guardado →${C.reset} ${C.bold}docs/baseline.json${C.reset}\n` +
    `  ${C.dim}Usa este archivo como referencia antes del Sprint 2 (dark hero).${C.reset}\n`,
  );

  server.kill('SIGTERM');
  pass('Servidor detenido');
  console.log();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
