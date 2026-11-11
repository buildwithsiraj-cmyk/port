"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Bot, Workflow, BarChart3 } from "lucide-react";
import { registerGsap, MQ, EASE } from "@/lib/animations/gsap";

type Service = { title: string; description: string };
const ICONS = [Code2, Bot, Workflow, BarChart3];

export function ServicesList({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (reduce) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia(listRef);

    mm.add(`${MQ.desktop}, ${MQ.tablet}, ${MQ.mobile}`, () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-service-item]");
      items.forEach((li, i) => {
        gsap.fromTo(
          li,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            delay: i * 0.08,
            ease: EASE,
            scrollTrigger: {
              trigger: li,
              start: "top 90%",
              once: true,
            },
            clearProps: "transform,willChange",
          }
        );
      });
    });

    return () => mm.revert();
  }, [reduce]);

  return (
    <ul ref={listRef} className="grid gap-4">
      {services.map((s, i) => {
        const Icon = ICONS[i % ICONS.length];
        const isActive = active === i;
        return (
          <li
            key={s.title}
            data-service-item
            className="will-change-transform"
          >
            <div>
              <button
                type="button"
                data-card
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`relative flex min-h-[88px] w-full items-start gap-3.5 sm:gap-5 overflow-hidden rounded-[12px] border px-4 py-4 sm:px-6 sm:py-5 text-left transition-all duration-300 ${
                  isActive
                    ? "border-[#6C8CFF]/70 bg-[#161a22] shadow-[0_18px_44px_-26px_rgba(108,140,255,0.38)]"
                    : "border-line bg-[#12151A] hover:border-[#3a414d] hover:bg-[#15181e]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="service-active-bar"
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] bg-[#22d3ee]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span
                  data-icon
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border transition-colors duration-200 ${
                    isActive
                      ? "border-[#6C8CFF]/60 text-[#6C8CFF] bg-[#6C8CFF]/10"
                      : "border-line text-muted"
                  }`}
                >
                  <Icon size={16} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-3">
                    <span
                      data-num
                      className={`font-mono text-[12px] tracking-[0.12em] transition-colors duration-200 ${
                        isActive ? "text-[#6C8CFF]" : "text-muted"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[17px] font-semibold leading-snug text-fg sm:text-[19px]">{s.title}</span>
                  </span>
                  <span className="mt-2 block max-w-[560px] text-[14.5px] leading-relaxed text-fg2">
                    {s.description}
                  </span>
                </span>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
