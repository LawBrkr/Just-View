import styles from "../page.module.css";
import esMessages from "../../messages/es.json";

type FooterDict = typeof esMessages.footer;

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footerInner} container`}>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>SIGNALIA</span>
            <p className={styles.footerTagline}>{dict.tagline}</p>
            <p className={styles.footerMeta}>{dict.meta}</p>
            {/* Social Media */}
            <div className={styles.footerSocial}>
              {/* TODO: Add real Instagram URL when created */}
              <a href="https://instagram.com/signalia.mx" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              {/* TODO: Add real LinkedIn URL when created */}
              <a href="https://linkedin.com/company/signalia" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M15 17v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>{dict.services.title}</h4>
              <a href="#servicios">{dict.services.signal}</a>
              <a href="#servicios">{dict.services.alia}</a>
              <a href="#precios">{dict.services.pricing}</a>
            </div>
            <div className={styles.footerCol}>
              <h4>{dict.contact.title}</h4>
              <a href="mailto:hola@signalia.com.mx">hola@signalia.com.mx</a>
              <a href="https://signalia.com.mx" target="_blank" rel="noopener noreferrer">signalia.com.mx</a>
            </div>
            <div className={styles.footerCol}>
              <h4>{dict.zones.title}</h4>
              <span>{dict.zones.first}</span>
              <span>{dict.zones.second}</span>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>{dict.copyright}</p>
          <p className={styles.footerSlogan}>{dict.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
