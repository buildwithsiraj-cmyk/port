"use client";

import { useEffect, useRef, useState } from "react";
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
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let hasStarted = false;
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
            setValue(Math.round(easedProgress * target));

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(target);
            }
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, reduce]);

  return (
    <span ref={ref} aria-label={`${target}${suffix}`}>
      {value}
      {suffix}
    </span>
  );
}
