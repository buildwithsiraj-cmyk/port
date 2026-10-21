"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerGsap, EASE, T } from "@/lib/animations/gsap";

/** Fade/raise children into view once. Content stays visible if JS/animation is off. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "p" | "h2" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = registerGsap();
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: T.section,
          delay,
          ease: EASE,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });
    return () => mm.revert();
  }, [delay]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
