'use client';

import { useState, useEffect, useRef } from 'react';

export function useCounter(
  target: number,
  duration: number,
  suffix: string,
  delay: number
): [React.RefObject<any>, string] {
  const [value, setValue] = useState(`0${suffix}`);
  const ref = useRef<any>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setValue(`${target}${suffix}`);
        return;
      }

      let startTime: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // easeOutExpo function for smooth deceleration
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        const currentVal = Math.floor(easeProgress * target);
        setValue(`${currentVal}${suffix}`);

        if (progress < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setValue(`${target}${suffix}`);
        }
      };

      if (delay > 0) {
        timeoutId = setTimeout(() => {
          animationFrameId = window.requestAnimationFrame(step);
        }, delay);
      } else {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [target, duration, suffix, delay]);

  return [ref, value];
}
