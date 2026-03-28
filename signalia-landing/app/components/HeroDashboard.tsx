"use client";

import React from "react";
import styles from "./HeroDashboard.module.css";
import { useCounter } from "@/hooks/useCounter";

type ColorToken = "verde" | "violeta" | "lavanda";

const colorMap: Record<ColorToken, string> = {
  verde: "var(--verde)",
  violeta: "var(--violeta)",
  lavanda: "var(--lavanda)",
};

interface DashboardBarProps {
  label: string;
  value: string | number;
  percentage: number;
  delay: number;
  color: ColorToken;
  counterRef: React.Ref<HTMLDivElement>;
}

function DashboardBar({ label, value, percentage, delay, color, counterRef }: DashboardBarProps) {
  return (
    <div className={styles.barRow} ref={counterRef}>
      <div className={styles.barHeader}>
        <span className={styles.barLabel}>{label}</span>
        <span className={styles.barValue} style={{ color: colorMap[color] }}>
          +{value}
        </span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            backgroundColor: colorMap[color],
            width: `${percentage}%`,
            animation: `fillBar 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            animationDelay: `${delay}ms`
          }}
        />
      </div>
    </div>
  );
}

export function HeroDashboard() {
  const [searchesRef, searchesVal] = useCounter(450, 2000, "%", 1400);
  const [clicksRef, clicksVal] = useCounter(280, 2000, "%", 1400);
  const [callsRef, callsVal] = useCounter(180, 2000, "%", 1400);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <span className={styles.dashboardDot} />
        GBP Performance
      </div>
      <div className={styles.dashboardBars}>
        <DashboardBar 
          label="Searches" 
          value={searchesVal} 
          percentage={95} 
          delay={800} 
          color="verde" 
          counterRef={searchesRef as React.Ref<HTMLDivElement>}
        />
        <DashboardBar 
          label="Clicks" 
          value={clicksVal} 
          percentage={75} 
          delay={1000} 
          color="violeta" 
          counterRef={clicksRef as React.Ref<HTMLDivElement>}
        />
        <DashboardBar 
          label="Calls" 
          value={callsVal} 
          percentage={60} 
          delay={1200} 
          color="lavanda" 
          counterRef={callsRef as React.Ref<HTMLDivElement>}
        />
      </div>
      <div className={styles.dashboardFooter}>
        <span>Last 30 days</span>
        <span className={styles.growing}>↑ Growing</span>
      </div>
    </div>
  );
}
