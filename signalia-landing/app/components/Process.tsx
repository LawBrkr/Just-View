import styles from "../page.module.css";
import esMessages from "../../messages/es.json";
import { AnimateIn } from "./AnimateIn";

type ProcessDict = typeof esMessages.process;

export default function Process({ dict }: { dict: ProcessDict }) {
  const steps = [
    { num: "01", title: dict.steps.audit.title, desc: dict.steps.audit.description },
    { num: "02", title: dict.steps.plan.title,  desc: dict.steps.plan.description  },
    { num: "03", title: dict.steps.results.title, desc: dict.steps.results.description },
  ];

  return (
    <section className={styles.process} id="proceso">
      <div className="container">
        <AnimateIn className={styles.processHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">{dict.title}</h2>
          <p className="section-subtitle">{dict.subtitle}</p>
        </AnimateIn>
        <div className={styles.processSteps}>
          {/* Animated connector line */}
          <div className={styles.processConnector} aria-hidden="true" />

          {steps.map((step, i) => (
            <AnimateIn key={step.num} delay={i * 120} className={styles.processStep}>
              <div className={styles.processNumWrap}>
                <div className={styles.processNum}>{step.num}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
