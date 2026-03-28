import styles from "../page.module.css";
import esMessages from "../../translations/es.json";

type CTADict = typeof esMessages.cta;

export default function CTASection({ dict }: { dict: CTADict }) {
  const DEMO_LINK = "https://cal.com/signalia";

  return (
    <section className={styles.cta} id="contacto">
      <div className="container">
        <div className={styles.ctaInner}>
          <div className={styles.ctaOrb} aria-hidden="true" />
          <span className="section-label" style={{ color: "var(--lavanda)" }}>{dict.label}</span>
          <h2 className={styles.ctaTitle}>{dict.title}</h2>
          <p className={styles.ctaSub}>{dict.subtitle}</p>
          <div className={styles.ctaActions}>
            <a
              href={DEMO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: "17px", padding: "18px 36px" }}
            >
              {dict.button}
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="mailto:hola@signalia.com.mx" className={styles.ctaEmail}>
              {dict.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
