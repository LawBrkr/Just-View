"use client";

import { useTranslations } from "next-intl";
import styles from "../page.module.css";
import { HeroDashboard } from "./HeroDashboard";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />
        <div className={styles.heroGrid} />
      </div>
      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            {t("hero.badge.text")}
          </div>
          <h1 className={styles.heroTitle}>
            {t("hero.title.line1")}<br />
            <span className={styles.heroGradient}>{t("hero.title.line2")}</span>
          </h1>
          <p className={styles.heroSub}>
            {t("hero.subtitle")}
          </p>
          <div className={styles.heroCtas}>
            <a href="#servicios" className="btn btn-secondary">
              {t("hero.cta.secondary")}
            </a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <HeroDashboard />
        </div>
      </div>
      <div className={`${styles.heroStats} container`}>
        <div className={styles.heroStat}>
          <span className={styles.heroStatVal}>{t("hero.stats.location.value")}</span>
          <span className={styles.heroStatLbl}>{t("hero.stats.location.label")}</span>
        </div>
        <div className={styles.heroStatDivider} />
        <div className={styles.heroStat}>
          <span className={styles.heroStatVal}>{t("hero.stats.services.value")}</span>
          <span className={styles.heroStatLbl}>{t("hero.stats.services.label")}</span>
        </div>
        <div className={styles.heroStatDivider} />
        <div className={styles.heroStat}>
          <span className={styles.heroStatVal}>{t("hero.stats.demo.value")}</span>
          <span className={styles.heroStatLbl}>{t("hero.stats.demo.label")}</span>
        </div>
      </div>
    </section>
  );
}
