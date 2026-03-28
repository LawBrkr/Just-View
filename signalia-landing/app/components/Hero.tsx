"use client";

import { useTranslations } from "next-intl";
import styles from "./hero.module.css";
import { HeroDashboard } from "./HeroDashboard";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className={styles.heroSection} id="hero">
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            Consultoría Tech · CDMX
          </div>
          <h1 className={styles.heroTitle}>
            {t("hero.title.line1")}<br />
            {t("hero.title.line2")}
          </h1>
          <p className={styles.heroSubtitle}>
            {t("hero.subtitle")}
          </p>
          <div className={styles.heroCtas}>
            <a href="#servicios" className="btn btn-primary">
              Nuestros servicios
            </a>
            <a href="#contacto" className="btn btn-secondary" style={{ color: "white", borderColor: "rgba(255,255,255,0.2)"}}>
              Hablar con un experto
            </a>
          </div>
        </div>
        <div className={styles.heroDashboardWrapper}>
          <HeroDashboard />
        </div>
      </div>
      
      {/* Dark to Light Transition Zone */}
      <div className={styles.heroTransitionZone} aria-hidden="true" />
    </section>
  );
}
