"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const MAX_TILT = 6; // degrees (spec: ~5–7)
const HOVER_SCALE = 1.025;
const SPRING = { stiffness: 140, damping: 20, mass: 0.6 };

const MASK =
  "linear-gradient(to bottom, black 72%, transparent 100%), linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)";

export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotionSafe();
  const [interactive, setInteractive] = useState(false);

  const ampRef = useRef(56); // scroll parallax distance (px), scaled by device class
  const rectRef = useRef<DOMRect | null>(null);

  // Pointer-driven motion is desktop / fine pointer only
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setInteractive(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  // Lighter vertical drift on laptops/tablets/phones; none for reduced motion
  useEffect(() => {
    const set = () => {
      const w = window.innerWidth;
      ampRef.current = reduce ? 0 : w >= 1440 ? 56 : w >= 1024 ? 40 : w >= 640 ? 20 : 12;
    };
    const invalidate = () => { rectRef.current = null; };
    set();
    window.addEventListener("resize", set, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("scroll", invalidate);
    };
  }, [reduce]);

  // ── Layer 1: scroll (outer wrapper) ───────────────────────────
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => -(Math.min(v, 700) / 700) * ampRef.current);
  const glowScroll = useTransform(scrollY, [0, 650], [1, 0]);

  // ── Layer 2: pointer (inner wrapper) ──────────────────────────
  const px = useMotionValue(0); // -0.5 … 0.5
  const py = useMotionValue(0);
  const hover = useMotionValue(0); // 0 | 1
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const scale = useSpring(useTransform(hover, [0, 1], [1, HOVER_SCALE]), SPRING);

  // Background light follows the pointer, moving opposite to the portrait
  const lightX = useSpring(useTransform(px, [-0.5, 0.5], [-34, 34]), { ...SPRING, stiffness: 90 });
  const lightY = useSpring(useTransform(py, [-0.5, 0.5], [-24, 24]), { ...SPRING, stiffness: 90 });
  const hoverLight = useSpring(hover, SPRING);
  const lx = useSpring(useTransform(px, [-0.5, 0.5], [20, 80]), { ...SPRING, stiffness: 90 });
  const ly = useSpring(useTransform(py, [-0.5, 0.5], [20, 80]), { ...SPRING, stiffness: 90 });
  const lightBg = useMotionTemplate`radial-gradient(260px circle at ${lx}% ${ly}%, rgba(140,120,255,0.22), rgba(108,140,255,0) 70%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || e.pointerType !== "mouse") return;
    const r = (rectRef.current ??= e.currentTarget.getBoundingClientRect());
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onEnter = () => interactive && hover.set(1);
  const onLeave = () => {
    rectRef.current = null;
    px.set(0);
    py.set(0);
    hover.set(0);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: reduce ? 0 : 0.6, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[400px] lg:-ml-10 lg:max-w-[640px] xl:-ml-16 xl:max-w-[700px]"
    >
      {/* Scroll layer */}
      <motion.div style={{ y }} className="relative will-change-transform">
        {/* Ambient glow — offset from the face, fades out with scroll */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-14%] bottom-[-4%] top-[22%]"
          style={{ opacity: glowScroll }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              x: lightX,
              y: lightY,
              background:
                "radial-gradient(closest-side, rgba(108,140,255,0.20), rgba(124,108,255,0.08) 55%, rgba(108,140,255,0) 78%)",
            }}
          />
          {/* Pointer-reactive blue-violet light (desktop only) */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: hoverLight, backgroundImage: lightBg }}
          />
        </motion.div>

        {/* Pointer layer */}
        <div
          className="relative"
          style={{ perspective: 1000 }}
          onPointerMove={onMove}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
        >
          <motion.div
            className="relative will-change-transform"
            style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
          >
            <Image
              src={src}
              alt={alt}
              width={1254}
              height={1254}
              priority
              draggable={false}
              sizes="(min-width: 1024px) 560px, (min-width: 640px) 400px, 300px"
              className="h-auto w-full select-none"
              style={{
                transform: "translateZ(24px)",
                maskImage: MASK,
                maskComposite: "intersect",
                WebkitMaskImage: MASK,
                WebkitMaskComposite: "source-in",
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
