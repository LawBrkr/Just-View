import styles from "../page.module.css";
import { AnimateIn } from "./AnimateIn";

interface TrustProps {
  dict: {
    label: string;
    items: string[];
  };
}

export default function Trust({ dict }: TrustProps) {
  return (
    <section className={styles.trust}>
      <div className="container">
        <AnimateIn>
          <span className="section-label">{dict.label}</span>
        </AnimateIn>
        <div className={styles.trustGrid}>
          {dict.items.map((item, i) => (
            <AnimateIn key={item} delay={i * 80} className={styles.trustBadge}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1l2.3 4.7L16 6.5l-3.5 3.4.8 4.9L9 12.6l-4.3 2.2.8-4.9L2 6.5l4.7-.8L9 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item}
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
