import styles from "./hero.module.css";
import { HeroDashboard } from "./HeroDashboard";
import socialProof from "../../data/social-proof.json";
import type esMessages from "../../messages/es.json";

type HeroDict = (typeof esMessages)["hero"];

const WA_DIAGNOSTICO = "https://wa.me/525666673841?text=Hola%2C%20quiero%20agendar%20mi%20diagn%C3%B3stico%20de%20automatizaci%C3%B3n.";

export default function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section className={styles.heroSection} id="hero">
      <div className={styles.heroOrb1} aria-hidden="true" />
      <div className={styles.heroOrb2} aria-hidden="true" />
      <div className={styles.heroGrid} aria-hidden="true" />

      <div className={`${styles.heroContent} container`}>
        <div className={styles.heroText}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            {dict.badge.text}
          </div>
          <h1 className={styles.heroTitle}>
            {dict.title.line1}<br />
            {dict.title.line2}
          </h1>
          <p className={styles.heroSubtitle}>
            {dict.subtitle}
          </p>
          <div className={styles.heroCtas}>
            <a
              href={WA_DIAGNOSTICO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gradient"
            >
              {dict.cta.primary}
            </a>
            <a
              href="#servicios"
              className="btn btn-ghost"
              style={{ borderColor: "rgba(255,255,255,0.5)", color: "white", backgroundColor: "transparent" }}
            >
              {dict.cta.secondary}
            </a>
          </div>
          <div
            className={styles.heroBadge}
            style={{
              color: "rgba(255, 255, 255, 0.75)",
              textTransform: "none",
              marginTop: "32px",
              fontSize: "13px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "4px",
            }}
          >
            <span>&#9733; {socialProof.rating} &middot; {socialProof.reviewCount} {dict.rating.label}</span>
            <span style={{ fontSize: "11px", opacity: 0.8 }}>{socialProof.zones.join(" · ")}</span>
          </div>
        </div>
        <div className={styles.heroDashboardWrapper}>
          <HeroDashboard />
        </div>
      </div>

      <div className={styles.heroTransitionZone} aria-hidden="true" />
    </section>
  );
}
