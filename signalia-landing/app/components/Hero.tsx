import styles from "./hero.module.css";
import { HeroDashboard } from "./HeroDashboard";
import socialProof from "../../data/social-proof.json";
import type esMessages from "../../messages/es.json";

type HeroDict = (typeof esMessages)["hero"];

export default function Hero({ dict }: { dict: HeroDict }) {
  return (
    <section className={styles.heroSection} id="hero">
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
            <a href="#contacto" className="btn btn-primary">
              {dict.cta.primary}
            </a>
            <a href="#servicios" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.7)", color: "white", backgroundColor: "transparent" }}>
              {dict.cta.secondary}
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
            <span>★ {socialProof.rating} · {socialProof.reviewCount} {dict.rating.label}</span>
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
