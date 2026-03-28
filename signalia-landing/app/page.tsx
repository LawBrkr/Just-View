import { cookies } from "next/headers";
import ClientIntlProvider from "./components/ClientIntlProvider";
import styles from "./page.module.css";

import esMessages from "../translations/es.json";
import enMessages from "../translations/en.json";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Results from "./components/Results";
import Personas from "./components/Personas";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

type Lang = "es" | "en";
const messages: Record<Lang, typeof esMessages> = { es: esMessages, en: enMessages };

export default async function Home() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "es") as Lang;
  const dict = messages[lang] || messages["es"];
  const tTrust = dict.trust;

  /* JSON-LD Structured Data */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Signalia",
    description: "Consultoría tech — Visibilidad digital + automatización IA para PyMEs en CDMX",
    url: "https://signalia.com.mx",
    email: "hola@signalia.com.mx",
    areaServed: {
      "@type": "City",
      name: "Ciudad de México",
    },
    serviceArea: [
      { "@type": "Place", name: "Polanco" },
      { "@type": "Place", name: "Condesa" },
      { "@type": "Place", name: "Roma" },
      { "@type": "Place", name: "Coyoacán" },
      { "@type": "Place", name: "Del Valle" },
      { "@type": "Place", name: "Santa Fe" },
    ],
    knowsLanguage: ["es", "en"],
    priceRange: "$$",
  };

  return (
    <ClientIntlProvider locale={lang} messages={dict} timeZone="America/Mexico_City">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        {dict.nav.skipToContent}
      </a>

      {/* ═══ NAVBAR ═══ */}
      <Navbar lang={lang} />

      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <Hero />

        {/* ═══ SERVICIOS ═══ */}
        <Services dict={dict.services} />

        {/* ═══ PROCESO ═══ */}
        <Process dict={dict.process} />

        {/* ═══ RESULTADOS / MÉTRICAS ═══ */}
        <Results />

        {/* ═══ BUYER PERSONAS ═══ */}
        <Personas dict={dict.personas} />

        {/* ═══ TRUST ═══ */}
        <section className={styles.trust}>
          <div className="container">
            <span className="section-label">{tTrust.label}</span>
            <div className={styles.trustGrid}>
              {tTrust.items.map((item: string) => (
                <div key={item} className={styles.trustBadge}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 1l2.3 4.7L16 6.5l-3.5 3.4.8 4.9L9 12.6l-4.3 2.2.8-4.9L2 6.5l4.7-.8L9 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRECIOS ═══ */}
        <Pricing dict={dict.pricing} />

        {/* ═══ FAQ ═══ */}
        <FAQ />

        {/* ═══ CTA FINAL ═══ */}
        <CTASection dict={dict.cta} />

        {/* Floating WhatsApp Button */}
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className={styles.floatingWa} aria-label="WhatsApp">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer dict={dict.footer} />
    </ClientIntlProvider>
  );
}
