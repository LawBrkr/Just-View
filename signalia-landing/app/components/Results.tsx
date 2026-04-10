"use client";

import styles from "../page.module.css";
import { useCounter } from "@/hooks/useCounter";
import type esMessages from "../../messages/es.json";

type ResultsDict = (typeof esMessages)["results"];

export default function Results({ dict }: { dict: ResultsDict }) {
  const [ref1, display1] = useCounter(85, 2000, dict.metrics.searches.suffix);
  const [ref2, display2] = useCounter(14, 1500, "");
  const [ref3, display3] = useCounter(95, 2000, dict.metrics.margin.suffix);

  return (
    <section className={styles.results} id="resultados">
      <div className="container">
        <div className={styles.resultsHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title" style={{ color: "var(--text-inverse)" }}>
            {dict.title}
          </h2>
        </div>
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard} ref={ref1}>
            <span className={styles.metricVal}>{display1}</span>
            <span className={styles.metricLbl}>{dict.metrics.searches.label}</span>
          </div>
          <div className={styles.metricCard} ref={ref2}>
            <span className={styles.metricVal}>{display2}{dict.metrics.hours.suffix}</span>
            <span className={styles.metricLbl}>{dict.metrics.hours.label}</span>
          </div>
          <div className={styles.metricCard} ref={ref3}>
            <span className={styles.metricVal}>{display3}</span>
            <span className={styles.metricLbl}>{dict.metrics.margin.label}</span>
          </div>
        </div>
        <div className={styles.resultsSource}>
          <p>{dict.source}</p>
        </div>
        <div className={styles.resultsQuote}>
          <p>{dict.quote}</p>
        </div>
      </div>
    </section>
  );
}
