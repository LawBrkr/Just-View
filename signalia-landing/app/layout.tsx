import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

/* ── Google Fonts (self-hosted by Next.js at build time) ── */
// DM Sans is a variable font — omit `weight` so axes work correctly
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
});

/* ── Local Font (woff2 files downloaded from Fontshare) ── */
const generalSans = localFont({
  src: [
    { path: "../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signalia.com.mx"),
  title: "Signalia — Tu señal más fuerte en lo digital",
  description:
    "Signalia es la consultora tech que convierte a PyMEs y negocios locales de CDMX en marcas visibles y operativamente inteligentes. Visibilidad digital en Google + automatización de procesos con IA.",
  keywords: [
    "Signalia",
    "consultoría tech",
    "PyMEs CDMX",
    "Google Business Profile",
    "automatización IA",
    "visibilidad digital",
    "presencia digital",
    "Polanco",
    "Condesa",
    "Roma",
    "Coyoacán",
    "Del Valle",
    "Santa Fe",
  ],
  openGraph: {
    title: "Signalia — Tu señal más fuerte en lo digital",
    description:
      "Visibilidad digital + automatización IA para negocios locales en CDMX.",
    url: "https://signalia.com.mx",
    siteName: "Signalia",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Signalia — Visibilidad digital + automatización IA para negocios en CDMX",
      },
    ],
  },
  other: {
    "theme-color": "#2D2B6B",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${generalSans.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
