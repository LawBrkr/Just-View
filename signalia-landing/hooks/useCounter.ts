"use client";

import { useState, useEffect, useRef } from "react";

export function useCounter(end: number, duration = 2000, suffix = "", delay = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          setTimeout(() => {
            const start = 0;
            const startTime = performance.now();
            const step = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(start + (end - start) * eased));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration, delay]);

  // Return as tuple instead of object to avoid ESLint false positives
  return [ref, `${count}${suffix}`] as const;
}
