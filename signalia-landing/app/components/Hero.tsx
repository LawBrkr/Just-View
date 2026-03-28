"use client";

import { useTranslations } from "next-intl";
import styles from "../page.module.css";

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
          <div className={styles.heroCard}>
            <div className={styles.heroCardHeader}>
              <span className={styles.heroCardDot} style={{ background: "#1D9E75" }} />
              <span className={styles.heroCardDot} style={{ background: "#534AB7" }} />
              <span className={styles.heroCardDot} style={{ background: "#7F77DD" }} />
            </div>
            <div className={styles.heroCardBody}>
              <div className={styles.heroMetric}>
                <span className={styles.heroMetricVal}>{t("hero.metric.value")}</span>
                <span className={styles.heroMetricLbl}>{t("hero.metric.label")}</span>
              </div>
              <div className={styles.heroBarContainer}>
                <div className={styles.heroBar} style={{ width: "85%" }}>
                  <span>{t("hero.bars.searches")}</span>
                </div>
                <div className={styles.heroBar} style={{ width: "72%", background: "var(--verde)" }}>
                  <span>{t("hero.bars.clicks")}</span>
                </div>
                <div className={styles.heroBar} style={{ width: "63%", background: "var(--lavanda)" }}>
                  <span>{t("hero.bars.calls")}</span>
                </div>
              </div>
              <div className={styles.heroCardFooter}>
                <span>{t("hero.card.footer.period")}</span>
                <span className={styles.heroCardTag}>{t("hero.card.footer.trend")}</span>
              </div>
            </div>
          </div>
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
