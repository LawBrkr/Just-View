"use client";

import { useState } from "react";
import styles from "../page.module.css";
import type esMessages from "../../messages/es.json";

type FAQDict = (typeof esMessages)["faq"];

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

export default function FAQ({ dict }: { dict: FAQDict }) {
  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className={styles.faqHeader}>
          <span className="section-label">{dict.label}</span>
          <h2 className="section-title">{dict.title}</h2>
        </div>
        <div className={styles.faqList}>
          {dict.items.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
