import styles from "../page.module.css";
import esMessages from "../../messages/es.json";

type PricingDict = typeof esMessages.pricing;

const WA_SIGNAL = "https://wa.me/525666673841?text=Hola%2C%20quiero%20info%20sobre%20el%20plan%20Signal.";
const WA_COMBO  = "https://wa.me/525666673841?text=Hola%2C%20me%20interesa%20el%20plan%20Signal%2BAlia.";
const WA_ALIA   = "https://wa.me/525666673841?text=Hola%2C%20quiero%20info%20sobre%20automatizacion%20con%20Alia.";

export default function Pricing({ dict }: { dict: PricingDict }) {
  return (
    <section className={styles.pricing} id="precios">
      <div className="container">
        <div className={styles.pricingHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">{dict.title}</h2>
          <p className="section-subtitle">{dict.subtitle}</p>
        </div>
        <div className={styles.pricingGrid}>

          {/* Signal */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingBadge} style={{ background: "var(--violeta-bg)", color: "var(--violeta)" }}>{dict.signal.badge}</div>
            <h3>{dict.signal.name}</h3>
            <div className={styles.pricingPrice}>
              <span className={styles.pricingAmount}>{dict.signal.amount}</span>
              <span className={styles.pricingPeriod}>{dict.signal.period}</span>
            </div>
            <ul className={styles.pricingFeatures}>
              {dict.signal.features.map((f: string) => <li key={f}>{f}</li>)}
            </ul>
            <a href={WA_SIGNAL} target="_blank" rel="noopener noreferrer" className={`btn btn-secondary ${styles.pricingCta}`}>
              {dict.signal.cta}
            </a>
          </div>

          {/* Combo Featured */}
          <div className={`${styles.pricingCard} ${styles.pricingFeatured}`}>
            <div className={styles.pricingPopular}>{dict.combo.popular}</div>
            <div className={styles.pricingBadge} style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{dict.combo.badge}</div>
            <h3>{dict.combo.name}</h3>
            <div className={styles.pricingPrice}>
              <span className={styles.pricingAmount}>{dict.combo.amount}</span>
              <span className={styles.pricingPeriod}>{dict.combo.period}</span>
            </div>
            <ul className={styles.pricingFeatures}>
              {dict.combo.features.map((f: string) => <li key={f}>{f}</li>)}
            </ul>
            <div className={styles.pricingUrgency}>Solo 2 cupos disponibles este mes</div>
            <a href={WA_COMBO} target="_blank" rel="noopener noreferrer" className={`btn btn-gradient ${styles.pricingCta}`}>
              {dict.combo.cta}
            </a>
          </div>

          {/* Alia */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingBadge} style={{ background: "var(--verde-bg)", color: "var(--verde)" }}>{dict.alia.badge}</div>
            <h3>{dict.alia.name}</h3>
            <div className={styles.pricingPrice}>
              <span className={styles.pricingAmount}>{dict.alia.amount}</span>
              <span className={styles.pricingPeriod}>{dict.alia.period}</span>
            </div>
            <ul className={styles.pricingFeatures}>
              {dict.alia.features.map((f: string) => <li key={f}>{f}</li>)}
            </ul>
            <a href={WA_ALIA} target="_blank" rel="noopener noreferrer" className={`btn btn-secondary ${styles.pricingCta}`}>
              {dict.alia.cta}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
