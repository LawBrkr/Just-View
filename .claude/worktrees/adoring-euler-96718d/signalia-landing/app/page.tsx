import esMessages from "../messages/es.json";

// Components
import NavbarShell from "./components/NavbarShell";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Results from "./components/Results";
import Personas from "./components/Personas";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Trust from "./components/Trust";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Static generation — landing has no dynamic data, revalidate daily.
export const dynamic = "force-static";
export const revalidate = 86400;

/* ── JSON-LD structured data (rendered inline as <script> on the server) ── */
const business = esMessages.business;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  description: business.description,
  url: business.url,
  email: business.email,
  areaServed: {
    "@type": "City",
    name: business.city,
  },
  serviceArea: business.neighborhoods.map((n) => ({
    "@type": "Place",
    name: n,
  })),
  knowsLanguage: ["es", "en"],
  priceRange: business.priceRange,
};

export default function Home() {
  const dict = esMessages;

  return (
    <>
      {/* JSON-LD structured data — server-rendered for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        {dict.nav.skipToContent}
      </a>

      {/* ═══ NAVBAR ═══ */}
      <NavbarShell dict={dict.nav} lang="es" />

      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <Hero dict={dict.hero} />

        {/* ═══ SERVICIOS ═══ */}
        <Services dict={dict.services} />

        {/* ═══ PROCESO ═══ */}
        <Process dict={dict.process} />

        {/* ═══ RESULTADOS / MÉTRICAS ═══ */}
        <Results dict={dict.results} />

        {/* ═══ BUYER PERSONAS ═══ */}
        <Personas dict={dict.personas} />

        {/* ═══ TRUST ═══ */}
        <Trust dict={dict.trust} />

        {/* ═══ PRECIOS ═══ */}
        <Pricing dict={dict.pricing} />

        {/* ═══ FAQ ═══ */}
        <FAQ dict={dict.faq} />

        {/* ═══ CTA FINAL ═══ */}
        <CTASection dict={dict.cta} />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer dict={dict.footer} />
    </>
  );
}
