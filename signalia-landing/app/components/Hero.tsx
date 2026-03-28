"use client";

import { useTranslations } from "next-intl";
import styles from "./hero.module.css";
import { HeroDashboard } from "./HeroDashboard";
import socialProof from "../../data/social-proof.json";

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
            <a href="#contacto" className="btn btn-primary">
              {t("hero.cta.primary")}
            </a>
            <a href="#servicios" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.7)", color: "white", backgroundColor: "transparent" }}>
              {t("hero.cta.secondary")}
            </a>
          </div>
          <div className={styles.heroBadge} style={{ 
            color: "rgba(255, 255, 255, 0.75)", 
            textTransform: "none", 
            marginTop: "32px", 
            fontSize: "13px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px"
          }}>
            <span>★ {socialProof.rating} · {socialProof.reviewCount} reseñas en Google</span>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>{socialProof.zones.join(" · ")}</span>
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
