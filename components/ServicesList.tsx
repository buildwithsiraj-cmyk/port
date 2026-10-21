"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Bot, Workflow, BarChart3 } from "lucide-react";
import { registerGsap, MQ } from "@/lib/animations/gsap";
import { motionScale } from "@/lib/animations/capability";

type Service = { title: string; description: string };
const ICONS = [Code2, Bot, Workflow, BarChart3];

const LINE = "#292E37";
const MUTED = "#737985";
const ACCENT = "#6C8CFF";
const ACCENT_EDGE = "rgba(108,140,255,0.75)";
const GLOW_ON = "0 18px 44px -26px rgba(108,140,255,0.38)";
const GLOW_OFF = "0 18px 44px -26px rgba(108,140,255,0)";

/**
 * Per-card scroll choreography. Each card has its own values so the four
 * stages feel related but not identical. `k` scales depth for tablet/mobile.
 */
const CARD_CFG = [
  { rx: 7, ry: 6, y: 56, z: -70, exitRx: -2 },
  { rx: 6, ry: -6, y: 52, z: -64, exitRx: -2 },
  { rx: 8, ry: 5, y: 58, z: -76, exitRx: -2.5 },
  { rx: 6, ry: -5, y: 50, z: -62, exitRx: -2 },
];

export function ServicesList({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia();

    const build = (k: number, scrub: number) => {
      items.current.forEach((li, i) => {
        if (!li) return;
        const cfg = CARD_CFG[i % CARD_CFG.length];
        const wrap = li.querySelector<HTMLElement>("[data-wrap]")!;
        const card = li.querySelector<HTMLElement>("[data-card]")!;
        const icon = li.querySelector<HTMLElement>("[data-icon]")!;
        const num = li.querySelector<HTMLElement>("[data-num]")!;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: li,
            // Slight per-card offsets keep the stages from firing in lockstep
            start: `top ${95 - i * 1.5}%`,
            end: `bottom ${14 + i * 1.5}%`,
            scrub,
            invalidateOnRefresh: true,
          },
        });

        // Phase A → B: approach and enter focus (0 → 0.4)
        tl.fromTo(
          wrap,
          {
            y: cfg.y * k,
            z: cfg.z * k,
            rotationX: -cfg.rx * k,
            rotationY: cfg.ry * k,
            scale: 0.95,
            opacity: 0.35,
            transformPerspective: 900,
            transformOrigin: "50% 60%",
          },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
          0,
        )
          .fromTo(wrap, { boxShadow: GLOW_OFF }, { boxShadow: GLOW_ON, duration: 0.4 }, 0)
          .fromTo(card, { borderColor: LINE }, { borderColor: ACCENT_EDGE, duration: 0.4 }, 0)
          .fromTo(icon, { color: MUTED, borderColor: LINE }, { color: ACCENT, borderColor: ACCENT_EDGE, duration: 0.4 }, 0)
          .fromTo(num, { color: MUTED }, { color: ACCENT, duration: 0.4 }, 0)
          // Phase C: active viewing — slight forward depth, no rotation (0.4 → 0.6)
          .to(wrap, { z: 22 * k, duration: 0.1, ease: "sine.out" }, 0.4)
          .to(wrap, { z: 22 * k, duration: 0.1 }, 0.5)
          // Phase D: leaving focus (0.6 → 1)
          .to(wrap, { z: 0, scale: 0.97, opacity: 0.8, rotationX: cfg.exitRx * k, duration: 0.4, ease: "power1.in" }, 0.6)
          .to(wrap, { boxShadow: GLOW_OFF, duration: 0.4 }, 0.6)
          .to(card, { borderColor: LINE, duration: 0.4 }, 0.6)
          .to(icon, { color: MUTED, borderColor: LINE, duration: 0.4 }, 0.6)
          .to(num, { color: MUTED, duration: 0.4 }, 0.6);
      });
    };

    // Desktop / laptop: perspective choreography scaled to width and capability
    mm.add(MQ.desktop, () => build(motionScale(), 0.7));
    // Tablet: reduced rotation and depth
    mm.add(MQ.tablet, () => build(0.55, 0.5));
    // Mobile: lightweight movement, normal flow
    mm.add(MQ.mobile, () => build(0.3, 0.4));

    // Reverts all tweens and kills every ScrollTrigger created above
    return () => mm.revert();
  }, []);

  return (
    <ul className="grid gap-4" style={{ perspective: 1000 }}>
      {services.map((s, i) => {
        const Icon = ICONS[i % ICONS.length];
        const isActive = active === i;
        return (
          <li
            key={s.title}
            ref={(el) => {
              items.current[i] = el;
            }}
          >
            <div data-wrap className="will-change-transform" style={{ transformStyle: "preserve-3d" }}>
              <button
                type="button"
                data-card
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="relative flex min-h-[88px] w-full items-start gap-4 overflow-hidden rounded-[12px] border border-line bg-[#12151A] px-5 py-5 text-left sm:gap-5 sm:px-6"
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
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-line text-muted"
                >
                  <Icon size={16} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-3">
                    <span data-num className="font-mono text-[12px] tracking-[0.12em] text-muted">
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
