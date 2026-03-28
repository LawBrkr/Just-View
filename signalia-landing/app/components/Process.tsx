import styles from "../page.module.css";
import esMessages from "../../translations/es.json";

type ProcessDict = typeof esMessages.process;

export default function Process({ dict }: { dict: ProcessDict }) {
  return (
    <section className={styles.process} id="proceso">
      <div className="container">
        <div className={styles.processHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">{dict.title}</h2>
          <p className="section-subtitle">{dict.subtitle}</p>
        </div>
        <div className={styles.processSteps}>
          <div className={styles.processStep}>
            <div className={styles.processNum}>01</div>
            <div className={styles.processLine} />
            <h3>{dict.steps.audit.title}</h3>
            <p>{dict.steps.audit.description}</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.processNum}>02</div>
            <div className={styles.processLine} />
            <h3>{dict.steps.plan.title}</h3>
            <p>{dict.steps.plan.description}</p>
          </div>
          <div className={styles.processStep}>
            <div className={styles.processNum}>03</div>
            <div className={styles.processLine} />
            <h3>{dict.steps.results.title}</h3>
            <p>{dict.steps.results.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
