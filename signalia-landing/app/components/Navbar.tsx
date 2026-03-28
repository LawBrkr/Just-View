"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import navStyles from "./Navbar.module.css";

interface NavbarProps {
  lang: string;
}

export default function Navbar({ lang }: NavbarProps) {
  const t = useTranslations();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // actually is "past hero"
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    // Intersection Observer for Hero
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setInHero(entry.isIntersecting);
            setScrolled(!entry.isIntersecting);
          });
        },
        { root: null, rootMargin: "-80px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(heroEl);
      return () => observer.disconnect();
    } else {
      // Fallback
      const handler = () => setScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handler, { passive: true });
      return () => window.removeEventListener("scroll", handler);
    }
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (
        anchor &&
        anchor.hash &&
        anchor.hash.startsWith("#") &&
        anchor.origin === window.location.origin
      ) {
        e.preventDefault();
        const el = document.querySelector(anchor.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", anchor.hash);
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  const handleLang = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  const DEMO_LINK = "https://cal.com/signalia";

  const rootNavClass = `${styles.nav} ${scrolled ? styles.navScrolled : ""} ${inHero ? navStyles.navHero : ""}`;
  const linkClass = inHero ? navStyles.navLink : "";

  return (
    <nav className={rootNavClass}>
      <div className={`${styles.navInner} container`}>
        <a href="#hero" className={`${styles.logo} ${inHero ? navStyles.logo : ""}`}>
          SIGNALIA
        </a>
        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
          <a href="#servicios" className={linkClass} onClick={() => setMenuOpen(false)}>{t("nav.links.services")}</a>
          <a href="#proceso" className={linkClass} onClick={() => setMenuOpen(false)}>{t("nav.links.process")}</a>
          <a href="#resultados" className={linkClass} onClick={() => setMenuOpen(false)}>{t("nav.links.results")}</a>
          <a href="#precios" className={linkClass} onClick={() => setMenuOpen(false)}>{t("nav.links.pricing")}</a>
          <a href="#faq" className={linkClass} onClick={() => setMenuOpen(false)}>{t("nav.links.faq")}</a>
          <a
            href={DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ color: "#ffffff" }}
            onClick={() => setMenuOpen(false)}
          >
            {t("nav.cta.label")}
          </a>
        </div>
        <div className={styles.navRight}>
          <div className="lang-switcher">
            <button
              className={`lang-btn ${inHero ? navStyles.langBtn : ""} ${lang === "es" ? "lang-active" : ""} ${lang === "es" && inHero ? navStyles.langBtnActive : ""}`}
              onClick={() => handleLang("es")}
              aria-label={t("nav.lang.esAriaLabel")}
            >
              {t("nav.lang.esLabel")}
            </button>
            <button
              className={`lang-btn ${inHero ? navStyles.langBtn : ""} ${lang === "en" ? "lang-active" : ""} ${lang === "en" && inHero ? navStyles.langBtnActive : ""}`}
              onClick={() => handleLang("en")}
              aria-label={t("nav.lang.enAriaLabel")}
            >
              {t("nav.lang.enLabel")}
            </button>
          </div>
          <button
            className={`${styles.hamburger} ${inHero ? navStyles.hamburger : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("nav.lang.menuAriaLabel")}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}
