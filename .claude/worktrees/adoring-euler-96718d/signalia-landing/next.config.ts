import type { NextConfig } from "next";

const securityHeaders = [
  // Prevents clickjacking by restricting iframe embedding
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stops MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Forces HTTPS for 1 year, includes subdomains
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Controls referrer information sent with requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restricts access to browser APIs
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // DNS prefetch only for same origin
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Inline scripts needed by Next.js runtime + JSON-LD
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Inline styles used by Next.js + CSS-in-JS
      "style-src 'self' 'unsafe-inline'",
      // Self-hosted fonts only (no more Google/Fontshare CDN)
      "font-src 'self'",
      // Images: self + data URIs + opengraph CDNs
      "img-src 'self' data: blob: https:",
      // API calls: Cal.com (demo) + WhatsApp + external analytics
      "connect-src 'self' https://cal.com https://wa.me https://*.vercel-insights.com",
      // iframes: Cal.com embed
      "frame-src 'self' https://cal.com",
      // Media (video/audio)
      "media-src 'self'",
      // Manifest
      "manifest-src 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Compression ──────────────────────────────────────────────────────────
  // Enables gzip compression for rendered content and static files.
  // On Vercel this is handled at the edge, so the flag is a no-op there,
  // but it keeps local `next start` and Docker deploys fast.
  compress: true,

  // ── Image Optimisation ───────────────────────────────────────────────────
  images: {
    // Serve AVIF first (smaller), fall back to WebP
    formats: ["image/avif", "image/webp"],
    // Breakpoints that match the landing's responsive grid
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    // Smaller sizes for images used at less than full viewport width
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Next.js 16 default is already 14400 s (4 h); be explicit
    minimumCacheTTL: 14400,
    // Disable the (x-powered-by style) "X-Powered-By" exposure for images
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Security Headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Self-hosted font files: long-lived cache + immutable
        source: "/fonts/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Miscellaneous ────────────────────────────────────────────────────────
  poweredByHeader: false,
};

export default nextConfig;
