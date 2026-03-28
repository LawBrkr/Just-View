"use client";

import React from "react";
import styles from "./hero.module.css";
import glassStyles from "@/styles/glass.module.css";
import { useCounter } from "@/hooks/useCounter";

type ColorToken = "verde" | "violeta" | "lavanda" | "indigo";

const colorMap: Record<ColorToken, string> = {
  verde: "var(--verde)",
  violeta: "var(--violeta)",
  lavanda: "var(--lavanda)",
  indigo: "rgba(83, 74, 183, 0.85)", // Indigo claro/translucent for contrast
};

interface DashboardBarProps {
  label: string;
  target: number;
  percentage: number;
  delay: number;
  color: ColorToken;
}

function DashboardBar({ label, target, percentage, delay, color }: DashboardBarProps) {
  const [counterRef, value] = useCounter(target, 1500, "%", delay);

  return (
    <div className={styles.dashboardBarRow} ref={counterRef as React.Ref<HTMLDivElement>}>
      <span className={styles.barLabel}>{label}</span>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={
            {
              "--target-width": `${percentage}%`,
              backgroundColor: colorMap[color],
              animationDelay: `${delay}ms`,
            } as React.CSSProperties
          }
        >
          <span className={styles.barValue}>+{value}</span>
        </div>
      </div>
    </div>
  );
}

export function HeroDashboard() {
  return (
    <div className={`${styles.dashboardCard} ${glassStyles.glassCard}`}>
      <div className={styles.dashboardHeader}>
        <span className={styles.dashboardHeaderDot} />
        GBP Performance
      </div>
      <div className={styles.dashboardBars}>
        <DashboardBar 
          label="Búsquedas" 
          target={187} 
          percentage={90} 
          delay={800} 
          color="verde" 
        />
        <DashboardBar 
          label="Clics" 
          target={134} 
          percentage={75} 
          delay={1000} 
          color="violeta" 
        />
        <DashboardBar 
          label="Ventas" 
          target={28} 
          percentage={30} 
          delay={1200} 
          color="lavanda" 
        />
        <DashboardBar 
          label="Nuevos cli" 
          target={43} 
          percentage={45} 
          delay={1400} 
          color="indigo" 
        />
      </div>
      <div className={styles.dashboardFooter}>
        <span className={styles.dashboardPeriod}>Últimos 45 días</span>
        <span className={styles.dashboardBadge}>↑ Creciendo</span>
      </div>
    </div>
  );
}
