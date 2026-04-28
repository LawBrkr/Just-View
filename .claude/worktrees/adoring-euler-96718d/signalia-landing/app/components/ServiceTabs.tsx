"use client";

import { useState } from "react";
import styles from "../page.module.css";

// We need to match the type used in Services.tsx
// But without importing the json if possible to keep it generic, or we can just use `any` or a specific interface for what we need.
// However, the prompt says "Recibe prop: dict (del tipo dict.services)", let's just use any for now or define a lightweight type.

type ServiceFeatures = {
  [key: string]: string;
};

type ServiceData = {
  label: string;
  title: string;
  description: string;
  features: ServiceFeatures;
  link: string;
};

type ServicesDict = {
  signal: ServiceData;
  alia: ServiceData;
};

export default function ServiceTabs({ dict }: { dict: ServicesDict }) {
  const [activeTab, setActiveTab] = useState<"signal" | "alia">("signal");

  const currentData = dict[activeTab];
  
  // Decide which features keys to render based on the active tab (optimization/reviews/posts/reports vs responses/followup/reports/integration)
  // Instead of hardcoding keys, we can just iterate over Object.values(currentData.features)
  const features = Object.values(currentData.features);

  return (
    <div className={styles.serviceTabsWrapper}>
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab("signal")}
          className={`btn ${activeTab === "signal" ? "btn-primary" : `btn-secondary ${styles.tabInactive}`}`}
        >
          {dict.signal.label}
        </button>
        <button
          onClick={() => setActiveTab("alia")}
          className={`btn ${activeTab === "alia" ? "btn-primary" : `btn-secondary ${styles.tabInactive}`}`}
        >
          {dict.alia.label}
        </button>
      </div>

      <div className={`${styles.serviceCard} ${activeTab === "signal" ? styles.serviceSignal : styles.serviceAlia}`}>
        <div className={styles.serviceIcon}>
          {activeTab === "signal" ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M16 2v4M16 26v4M2 16h4M26 16h4M5.5 5.5l2.8 2.8M23.7 23.7l2.8 2.8M5.5 26.5l2.8-2.8M23.7 8.3l2.8-2.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M11 15l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 8V5a2 2 0 012-2h8a2 2 0 012 2v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <div className={styles.serviceLabel}>{currentData.label}</div>
        <h3 className={styles.serviceTitle}>{currentData.title}</h3>
        <p className={styles.serviceDesc}>{currentData.description}</p>
        <ul className={styles.serviceFeatures}>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <a href="#precios" className={styles.serviceLink}>{currentData.link}</a>
      </div>
    </div>
  );
}
