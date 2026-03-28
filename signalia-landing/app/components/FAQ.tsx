"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "../page.module.css";

/* ── FAQ Accordion Item ── */
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={styles.faqIcon}>{open ? "−" : "+"}</span>
      </button>
      <div className={styles.faqAnswer} style={{ maxHeight: open ? "300px" : "0" }}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const t = useTranslations();
  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;

  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className={styles.faqHeader}>
          <span className="section-label">{t("faq.label")}</span>
          <h2 className="section-title">{t("faq.title")}</h2>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
