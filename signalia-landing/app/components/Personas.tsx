import styles from "../page.module.css";
import esMessages from "../../translations/es.json";

type PersonasDict = typeof esMessages.personas;

export default function Personas({ dict }: { dict: PersonasDict }) {
  return (
    <section className={styles.personas} id="para-quien">
      <div className="container">
        <div className={styles.personasHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">{dict.title}</h2>
        </div>
        <div className={styles.personasGrid}>
          <div className={styles.personaCard}>
            <div className={styles.personaEmoji}>🍽️</div>
            <h3>{dict.carlos.name}</h3>
            <p className={styles.personaRole}>{dict.carlos.role}</p>
            <p className={styles.personaDetail}>{dict.carlos.detail}</p>
            <div className={styles.personaEntry}>
              <span>{dict.entry.label}</span> {dict.carlos.entry}
            </div>
          </div>
          <div className={styles.personaCard}>
            <div className={styles.personaEmoji}>🦷</div>
            <h3>{dict.maria.name}</h3>
            <p className={styles.personaRole}>{dict.maria.role}</p>
            <p className={styles.personaDetail}>{dict.maria.detail}</p>
            <div className={styles.personaEntry}>
              <span>{dict.entry.label}</span> {dict.maria.entry}
            </div>
          </div>
          <div className={styles.personaCard}>
            <div className={styles.personaEmoji}>🏨</div>
            <h3>{dict.james.name}</h3>
            <p className={styles.personaRole}>{dict.james.role}</p>
            <p className={styles.personaDetail}>{dict.james.detail}</p>
            <div className={styles.personaEntry}>
              <span>{dict.entry.label}</span> {dict.james.entry}
            </div>
          </div>
          <div className={styles.personaCard}>
            <div className={styles.personaEmoji}>🚀</div>
            <h3>{dict.andres.name}</h3>
            <p className={styles.personaRole}>{dict.andres.role}</p>
            <p className={styles.personaDetail}>{dict.andres.detail}</p>
            <div className={styles.personaEntry}>
              <span>{dict.entry.label}</span> {dict.andres.entry}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
