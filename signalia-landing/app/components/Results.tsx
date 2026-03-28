"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "../page.module.css";

/* ── Animated Counter Hook ── */
function useCounter(end: number, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const start = 0;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  // Return as tuple instead of object to avoid ESLint false positives
  return [ref, `${count}${suffix}`] as const;
}

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
