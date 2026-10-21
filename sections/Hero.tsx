"use client";

import { useEffect, useRef } from "react";
import { motion, MotionConfig } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { registerGsap, MQ } from "@/lib/animations/gsap";
import { portfolio } from "@/data/portfolio";
import { HeroPortrait } from "@/components/HeroPortrait";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const GRID =
  "linear-gradient(to right, rgba(41,46,55,0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,46,55,0.55) 1px, transparent 1px)";

export function Hero() {
  const reduce = useReducedMotionSafe();
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const glowA = useRef<HTMLDivElement>(null);
  const glowB = useRef<HTMLDivElement>(null);
  const gridLayer = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia(root);

    const scrollLinked = () => {
      const st = { trigger: root.current!, start: "top top", end: "bottom top", scrub: 0.6 };
      // Background layers drift at different speeds (parallax depth)
      gsap.to(glowA.current, { yPercent: 16, ease: "none", scrollTrigger: st });
      gsap.to(glowB.current, { yPercent: 8, ease: "none", scrollTrigger: st });
      gsap.to(gridLayer.current, { yPercent: 6, ease: "none", scrollTrigger: st });
      // Text lifts away and fades as the gallery arrives
      gsap.to(content.current, {
        opacity: 0,
        y: -56,
        ease: "none",
        scrollTrigger: { ...st, start: "30% top", end: "bottom 30%" },
      });
      gsap.to(cue.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...st, start: "top top", end: "20% top" },
      });
    };

    mm.add(MQ.desktop, () => {
      scrollLinked();
      // Soft pointer response for the ambient light (fine pointers only)
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const gx = gsap.quickTo(glowA.current, "x", { duration: 1.6, ease: "power3.out" });
        const onMove = (e: PointerEvent) => gx((e.clientX / window.innerWidth - 0.5) * -36);
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      }
    });
    mm.add(MQ.tablet, scrollLinked);

    return () => mm.revert();
  }, []);

  const words = portfolio.headline.split(" ");
  const base = reduce ? 0 : 1;
  const item = (delay: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, delay: delay * base, ease: EASE_OUT },
    }) as const;

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="top"
      ref={root}
      data-hero
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-[88px] lg:min-h-[92svh] lg:pb-10 lg:pt-[80px]"
    >
      <noscript>
        <style>{`[data-hero] *{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* Background — low contrast, spans the whole hero */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* Grid + intersection accents (share one parallax layer) */}
        <div ref={gridLayer} className="absolute -inset-y-10 inset-x-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: GRID,
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 85% 75% at 60% 45%, black 20%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 75% at 60% 45%, black 20%, transparent 85%)",
            }}
          />
          {[
            "left-[448px] top-[256px]",
            "left-[1024px] top-[192px]",
            "left-[704px] top-[576px]",
          ].map((pos, i) => (
            <span
              key={pos}
              className={`absolute hidden h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60 lg:block ${pos}`}
              style={reduce ? undefined : { animation: `hero-pulse 4.2s ease-in-out ${i * 1.3}s infinite` }}
            />
          ))}
        </div>

        {/* Secondary glow behind the headline */}
        <div
          ref={glowB}
          className="absolute left-[-10%] top-[18%] h-[420px] w-[620px] rounded-full opacity-70 sm:h-[520px] sm:w-[760px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(108,140,255,0.07), rgba(108,140,255,0) 70%)",
          }}
        />
        {/* Primary glow behind the portrait */}
        <div
          ref={glowA}
          className="absolute right-[-12%] top-[10%] h-[520px] w-[620px] rounded-full sm:h-[700px] sm:w-[820px] lg:right-[-4%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(112,120,255,0.16), rgba(108,140,255,0.05) 55%, rgba(108,140,255,0) 75%)",
          }}
        />

        {/* Fine-line data visualisation */}
        <svg
          className="absolute inset-x-0 bottom-[8%] hidden h-[140px] w-full lg:block"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 104 C120 98 180 70 280 76 S440 118 560 92 S720 36 860 58 S1040 110 1160 70 S1340 30 1440 44"
            stroke="rgba(108,140,255,0.22)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.8 * base, ease: "easeInOut" }}
          />
        </svg>

        {/* Blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-b from-transparent to-bg" />
      </motion.div>

      <div className="container-x relative grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div ref={content} className="will-change-transform">
          <motion.div {...item(0.2)} className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-3.5 py-1.5 backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] font-medium tracking-wider text-fg2 uppercase">
              Available for New Projects
            </span>
          </motion.div>

          <h1
            className="h-hero max-w-[16ch] text-balance font-semibold tracking-[-0.035em]"
            aria-label={portfolio.headline}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="mr-[0.25em] inline-block"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: base * (0.35 + i * 0.05), ease: EASE_OUT }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          <motion.p {...item(0.85)} className="mt-5 max-w-[540px] text-[16px] leading-relaxed text-fg2">
            {portfolio.intro}
          </motion.p>

          <motion.div {...item(1.0)} className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href="#work" className="btn btn-primary group shadow-lg shadow-accent/15">
              Explore My Work
              <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden>↓</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in Touch
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
            </a>
          </motion.div>

          {/* Quick metric highlights */}
          <motion.div
            {...item(1.15)}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-line/60 pt-6 max-w-[500px]"
          >
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-fg">8+</div>
              <div className="text-[12px] text-muted">Production Apps</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-accent">100%</div>
              <div className="text-[12px] text-muted">Client Satisfaction</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-fg">Full-Stack</div>
              <div className="text-[12px] text-muted">AI & Automation</div>
            </div>
          </motion.div>
        </div>

        {/* Right side: Engineering & Architecture Showcase Deck */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.45 * base, ease: EASE_OUT }}
          className="relative flex flex-col gap-3.5"
        >
          {/* Ambient card glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent/20 to-purple-500/10 opacity-50 blur-xl pointer-events-none" />

          {/* Card 1: Core Competency HUD */}
          <div className="relative rounded-xl border border-line/80 bg-card/80 p-5 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-accent/40">
            <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-accent" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Technical Architecture
                </span>
              </div>
              <span className="rounded bg-elevated px-2 py-0.5 font-mono text-[10px] text-accent">
                ACTIVE STACK
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-line/50 bg-elevated/60 p-3">
                <div className="font-mono text-[11px] text-accent font-medium">Gen AI & Agents</div>
                <div className="mt-1 text-[12px] text-fg2 leading-snug">LLMs · RAG · Automated Workflows</div>
              </div>
              <div className="rounded-lg border border-line/50 bg-elevated/60 p-3">
                <div className="font-mono text-[11px] text-accent font-medium">Full Stack Web</div>
                <div className="mt-1 text-[12px] text-fg2 leading-snug">Next.js · React · TypeScript · Node</div>
              </div>
              <div className="rounded-lg border border-line/50 bg-elevated/60 p-3">
                <div className="font-mono text-[11px] text-accent font-medium">Data & Pipelines</div>
                <div className="mt-1 text-[12px] text-fg2 leading-snug">Python · ETL · APIs · Scalable DBs</div>
              </div>
              <div className="rounded-lg border border-line/50 bg-elevated/60 p-3">
                <div className="font-mono text-[11px] text-accent font-medium">Business Automation</div>
                <div className="mt-1 text-[12px] text-fg2 leading-snug">CRMs · WhatsApp Bot · Webhooks</div>
              </div>
            </div>
          </div>

          {/* Card 2: Featured Work Quick Glance */}
          <div className="relative rounded-xl border border-line/80 bg-card/80 p-4 backdrop-blur-xl transition-all duration-300 hover:border-accent/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 border border-accent/25 text-accent font-mono text-xs font-bold">
                  01
                </div>
                <div>
                  <div className="text-[13px] font-medium text-fg">Enterprise & Client Deliveries</div>
                  <div className="text-[11px] text-muted">From zero-to-one architecture to scalable deployment</div>
                </div>
              </div>
              <a
                href="#work"
                className="font-mono text-[11px] text-accent hover:underline inline-flex items-center gap-1"
              >
                View Works <span>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        ref={cue}
        href="#work"
        aria-label="Scroll to selected work"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 * base }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-fg2 sm:flex"
      >
        <span className="label !text-[10px]">Scroll</span>
        <span className="relative block h-8 w-px overflow-hidden bg-line">
          <span
            className="absolute inset-x-0 top-0 h-3 bg-accent"
            style={reduce ? undefined : { animation: "hero-scroll 2s ease-in-out infinite" }}
          />
        </span>
      </motion.a>
    </section>
    </MotionConfig>
  );
}
