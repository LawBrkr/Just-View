import styles from "../page.module.css";
import esMessages from "../../messages/es.json";
import ServiceTabs from "./ServiceTabs";

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
        <ServiceTabs dict={dict} />
      </div>
    </section>
  );
}
