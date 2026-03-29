import { cookies } from "next/headers";
import ClientIntlProvider from "./components/ClientIntlProvider";

import esMessages from "../messages/es.json";
import enMessages from "../messages/en.json";

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
import Trust from "./components/Trust";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import StructuredData from "./components/StructuredData";

type Lang = "es" | "en";
const messages: Record<Lang, typeof esMessages> = { es: esMessages, en: enMessages };

export default async function Home() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || "es") as Lang;
  const dict = messages[lang] || messages["es"];
  const tTrust = dict.trust;

  return (
    <ClientIntlProvider locale={lang} messages={dict} timeZone="America/Mexico_City">
      <StructuredData dict={dict} />

      {/* Skip to content */}
      <a href="#main-content" className="skip-to-content">
        {dict.nav.skipToContent}
      </a>

      {/* ═══ NAVBAR ═══ */}
      <Navbar lang={lang} />

      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <Hero dict={dict.hero} />

        {/* ═══ SERVICIOS ═══ */}
        <Services dict={dict.services} />

        {/* ═══ PROCESO ═══ */}
        <Process dict={dict.process} />

        {/* ═══ RESULTADOS / MÉTRICAS ═══ */}
        <Results />

        {/* ═══ BUYER PERSONAS ═══ */}
        <Personas dict={dict.personas} />

        {/* ═══ TRUST ═══ */}
        <Trust dict={tTrust} />

        {/* ═══ PRECIOS ═══ */}
        <Pricing dict={dict.pricing} />

        {/* ═══ FAQ ═══ */}
        <FAQ />

        {/* ═══ CTA FINAL ═══ */}
        <CTASection dict={dict.cta} />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer dict={dict.footer} />
    </ClientIntlProvider>
  );
}
