import styles from "../page.module.css";
import esMessages from "../../translations/es.json";

type ServicesDict = typeof esMessages.services;

export default function Services({ dict }: { dict: ServicesDict }) {
  return (
    <section className={styles.services} id="servicios">
      <div className="container">
        <div className={styles.servicesHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">
            {dict.title.line1}<br />{dict.title.line2}
          </h2>
          <p className="section-subtitle">
            {dict.subtitle}
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {/* Signal */}
          <div className={`${styles.serviceCard} ${styles.serviceSignal}`}>
            <div className={styles.serviceIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M16 2v4M16 26v4M2 16h4M26 16h4M5.5 5.5l2.8 2.8M23.7 23.7l2.8 2.8M5.5 26.5l2.8-2.8M23.7 8.3l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.serviceLabel}>{dict.signal.label}</div>
            <h3 className={styles.serviceTitle}>{dict.signal.title}</h3>
            <p className={styles.serviceDesc}>{dict.signal.description}</p>
            <ul className={styles.serviceFeatures}>
              <li>{dict.signal.features.optimization}</li>
              <li>{dict.signal.features.reviews}</li>
              <li>{dict.signal.features.posts}</li>
              <li>{dict.signal.features.reports}</li>
            </ul>
            <a href="#precios" className={styles.serviceLink}>{dict.signal.link}</a>
          </div>
          {/* Alia */}
          <div className={`${styles.serviceCard} ${styles.serviceAlia}`}>
            <div className={styles.serviceIcon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M11 15l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8V5a2 2 0 012-2h8a2 2 0 012 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.serviceLabel}>{dict.alia.label}</div>
            <h3 className={styles.serviceTitle}>{dict.alia.title}</h3>
            <p className={styles.serviceDesc}>{dict.alia.description}</p>
            <ul className={styles.serviceFeatures}>
              <li>{dict.alia.features.responses}</li>
              <li>{dict.alia.features.followup}</li>
              <li>{dict.alia.features.reports}</li>
              <li>{dict.alia.features.integration}</li>
            </ul>
            <a href="#precios" className={styles.serviceLink}>{dict.alia.link}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
