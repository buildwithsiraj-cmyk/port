"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduce) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    let hasStarted = false;
    let rafId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          hasStarted = true;
          const startTime = performance.now();
          const step = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easedProgress * target);

            if (ref.current) {
              ref.current.textContent = `${currentVal}${suffix}`;
            }

            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            } else if (ref.current) {
              ref.current.textContent = `${target}${suffix}`;
            }
          };
          rafId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, suffix, reduce]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      0{suffix}
    </span>
  );
}
