#!/usr/bin/env bash
# ============================================================
#  init.sh — Signalia Landing · Setup & Local Dev Script
#  Repositorio: https://github.com/LawBrkr/signalia-proyecto-
#  Generado por: Claude (Cowork Mode)
#  Fecha: 2026-03-27
# ============================================================

set -e  # Detener ejecución si hay algún error

echo ""
echo "🚀  Inicializando Signalia Landing..."
echo "================================================"

# ── 1. Verificar Node.js ──────────────────────────────────
echo ""
echo "▶ Verificando Node.js..."
if ! command -v node &> /dev/null; then
  echo "❌  Node.js no encontrado. Instálalo desde https://nodejs.org (v18+ recomendado)"
  exit 1
fi
echo "✅  Node.js $(node -v) detectado"

# ── 2. Verificar npm ─────────────────────────────────────
echo ""
echo "▶ Verificando npm..."
if ! command -v npm &> /dev/null; then
  echo "❌  npm no encontrado. Viene incluido con Node.js."
  exit 1
fi
echo "✅  npm $(npm -v) detectado"

# ── 3. Variables de entorno ──────────────────────────────
echo ""
echo "▶ Verificando archivo .env.local..."
if [ ! -f ".env.local" ]; then
  echo "⚠️   No se encontró .env.local"
  echo "    Crea el archivo con las variables necesarias."
  echo "    Ejemplo mínimo:"
  echo ""
  echo "    # .env.local"
  echo "    NEXT_PUBLIC_SITE_URL=http://localhost:3000"
  echo ""
  echo "    (Omitiendo — el proyecto puede funcionar sin variables de entorno en desarrollo)"
else
  echo "✅  .env.local encontrado"
fi

# ── 4. Instalar dependencias ─────────────────────────────
echo ""
echo "▶ Instalando dependencias con npm..."
npm install

echo "✅  Dependencias instaladas"

# ── 5. Build de verificación (opcional) ─────────────────
echo ""
read -p "¿Deseas hacer un build de verificación ahora? (s/N): " do_build
if [[ "$do_build" =~ ^[Ss]$ ]]; then
  echo "▶ Ejecutando next build..."
  npm run build
  echo "✅  Build exitoso"
fi

# ── 6. Arrancar servidor de desarrollo ───────────────────
echo ""
echo "================================================"
echo "✅  Setup completo. Para iniciar el servidor:"
echo ""
echo "    cd signalia-landing  (si no estás aquí)"
echo "    npm run dev"
echo ""
echo "    La app estará en: http://localhost:3000"
echo "================================================"

read -p "¿Arrancar el servidor de desarrollo ahora? (S/n): " do_dev
if [[ ! "$do_dev" =~ ^[Nn]$ ]]; then
  echo ""
  echo "▶ Iniciando next dev..."
  npm run dev
fi
