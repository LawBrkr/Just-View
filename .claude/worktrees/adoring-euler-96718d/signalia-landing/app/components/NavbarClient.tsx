"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import navStyles from "./Navbar.module.css";
import type esMessages from "../../messages/es.json";

type NavDict = (typeof esMessages)["nav"];

interface NavbarClientProps {
  dict: NavDict;
  lang: string;
}

export default function NavbarClient({ dict, lang }: NavbarClientProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [inHero, setInHero] = useState(true);

  // Sync dynamic classes onto the SSR-rendered <nav> and logo <a>
  useEffect(() => {
    const nav = document.getElementById("main-nav");
    const logo = document.getElementById("nav-logo");
    if (!nav || !logo) return;

    if (inHero) {
      nav.classList.add(navStyles.navHero);
      nav.classList.remove(styles.navScrolled);
      logo.classList.add(navStyles.logo);
    } else {
      nav.classList.remove(navStyles.navHero);
      nav.classList.add(styles.navScrolled);
      logo.classList.remove(navStyles.logo);
    }
  }, [inHero]);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setInHero(entry.isIntersecting));
        },
        { root: null, rootMargin: "-80px 0px 0px 0px", threshold: 0 }
      );
      observer.observe(heroEl);
      return () => observer.disconnect();
    } else {
      const handler = () => setInHero(window.scrollY <= 50);
      window.addEventListener("scroll", handler, { passive: true });
      return () => window.removeEventListener("scroll", handler);
    }
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
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
  const linkClass = inHero ? navStyles.navLink : "";

  return (
    <>
      <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
        <a href="#servicios" className={linkClass} onClick={() => setMenuOpen(false)}>{dict.links.services}</a>
        <a href="#proceso" className={linkClass} onClick={() => setMenuOpen(false)}>{dict.links.process}</a>
        <a href="#resultados" className={linkClass} onClick={() => setMenuOpen(false)}>{dict.links.results}</a>
        <a href="#precios" className={linkClass} onClick={() => setMenuOpen(false)}>{dict.links.pricing}</a>
        <a href="#faq" className={linkClass} onClick={() => setMenuOpen(false)}>{dict.links.faq}</a>
        <a
          href={DEMO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{ color: "#ffffff" }}
          onClick={() => setMenuOpen(false)}
        >
          {dict.cta.label}
        </a>
      </div>
      <div className={styles.navRight}>
        <div className={`lang-switcher ${inHero ? navStyles.langSwitcher : ""}`}>
          <button
            className={`lang-btn ${inHero ? `${navStyles.langBtn} ${lang === "es" ? navStyles.langBtnActive : ""}` : lang === "es" ? "lang-active" : ""}`}
            onClick={() => handleLang("es")}
            aria-label={dict.lang.esAriaLabel}
          >
            {dict.lang.esLabel}
          </button>
          <button
            className={`lang-btn ${inHero ? `${navStyles.langBtn} ${lang === "en" ? navStyles.langBtnActive : ""}` : lang === "en" ? "lang-active" : ""}`}
            onClick={() => handleLang("en")}
            aria-label={dict.lang.enAriaLabel}
          >
            {dict.lang.enLabel}
          </button>
        </div>
        <button
          className={`${styles.hamburger} ${inHero ? navStyles.hamburger : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={dict.lang.menuAriaLabel}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </>
  );
}
