import styles from "../page.module.css";
import esMessages from "../../messages/es.json";

type CTADict = typeof esMessages.cta;

const DEMO_LINK = "https://wa.me/525666673841?text=Hola%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20de%20automatizaci%C3%B3n.";

export default function CTASection({ dict }: { dict: CTADict }) {
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
              className="btn btn-gradient"
              style={{ fontSize: "17px", padding: "18px 36px" }}
            >
              {dict.button}
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
