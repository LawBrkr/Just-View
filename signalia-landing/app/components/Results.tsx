"use client";

import { useTranslations } from "next-intl";
import styles from "../page.module.css";
import { useCounter } from "@/hooks/useCounter";

export default function Results() {
  const t = useTranslations();

  const [ref1, display1] = useCounter(85, 2000, t("results.metrics.searches.suffix"));
  const [ref2, display2] = useCounter(14, 1500, "");
  const [ref3, display3] = useCounter(95, 2000, t("results.metrics.margin.suffix"));

  return (
    <section className={styles.results} id="resultados">
      <div className="container">
        <div className={styles.resultsHeader}>
          <span className="section-label">{t("results.label")}</span>
          <h2 className="section-title" style={{ color: "var(--text-inverse)" }}>
            {t("results.title")}
          </h2>
        </div>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard} ref={ref1}>
            <span className={styles.metricVal}>{display1}</span>
            <span className={styles.metricLbl}>{t("results.metrics.searches.label")}</span>
          </div>
          <div className={styles.metricCard} ref={ref2}>
            <span className={styles.metricVal}>{display2}{t("results.metrics.hours.suffix")}</span>
            <span className={styles.metricLbl}>{t("results.metrics.hours.label")}</span>
          </div>
          <div className={styles.metricCard} ref={ref3}>
            <span className={styles.metricVal}>{display3}</span>
            <span className={styles.metricLbl}>{t("results.metrics.margin.label")}</span>
          </div>
        </div>
        <div className={styles.resultsSource}>
          <p>{t("results.source")}</p>
        </div>
        <div className={styles.resultsQuote}>
          <p>{t("results.quote")}</p>
        </div>
      </div>
    </section>
  );
}
