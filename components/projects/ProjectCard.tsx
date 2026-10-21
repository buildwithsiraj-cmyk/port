"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon as Github } from "@/components/icons";
import type { Project } from "@/data/portfolio";

const TILT_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { title, description, image, imageAlt, category, tags, github, demo, href } = project;
  const ref = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const lift = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sy = useSpring(ry, { stiffness: 220, damping: 22 });
  const sl = useSpring(lift, { stiffness: 220, damping: 24 });

  // Evaluate capability once (and on change) instead of on every pointer move,
  // and cache the card rect so pointer moves don't force layout reads.
  const tiltOk = useRef(false);
  const rect = useRef<DOMRect | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(TILT_QUERY);
    const update = () => { tiltOk.current = mq.matches; };
    const invalidate = () => { rect.current = null; };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
    };
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !tiltOk.current || !ref.current) return;
    const r = (rect.current ??= ref.current.getBoundingClientRect());
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 6);
    rx.set(py * -6);
    lift.set(-6);
  };
  const reset = () => {
    rect.current = null;
    rx.set(0);
    ry.set(0);
    lift.set(0);
  };

  const projectHref = href ?? `/work/${project.slug}`;
  const titleEl = (
    <a href={projectHref} className="after:absolute after:inset-0 hover:text-accent transition-colors duration-200">
      {title}
    </a>
  );

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{ rotateX: sx, rotateY: sy, y: sl, transformPerspective: 1100 }}
      className="group relative overflow-hidden rounded-[12px] border border-line bg-card transition-[border-color,box-shadow] duration-300 hover:border-[#3a414d] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] focus-within:border-accent/60"
    >
      <PreviewWrap href={projectHref}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? `${title} screenshot`}
            fill
            sizes="(min-width: 1024px) 1200px, (min-width: 640px) 90vw, 100vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-[400ms] ease-out lg:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="label">Preview coming soon</span>
          </div>
        )}
      </PreviewWrap>

      <div className="p-4 sm:p-6 min-w-0">
        {(category || tags?.length) && (
          <div className="label mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            {category && <span className="text-accent">{category}</span>}
            {tags?.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
        <h3 className="text-[20px] sm:text-[22px] font-medium leading-snug tracking-[-0.02em] break-words">{titleEl}</h3>
        {description && <p className="mt-2 text-[13.5px] sm:text-[14px] leading-[1.7] text-fg2">{description}</p>}

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          <a
            href={projectHref}
            aria-label={`View project details for ${title}`}
            className="inline-flex h-10 sm:h-11 items-center gap-1.5 rounded-lg bg-accent px-3.5 sm:px-4 text-[13px] sm:text-[14px] font-medium text-bg transition-colors duration-150 hover:bg-[#8aa3ff]"
          >
            View Project Details <ArrowUpRight size={15} aria-hidden />
          </a>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live website for ${title} (opens in new tab)`}
              className="inline-flex h-10 sm:h-11 items-center gap-1.5 rounded-lg border border-line px-3.5 sm:px-4 text-[13px] sm:text-[14px] font-medium text-fg2 transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Live Site <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} source code on GitHub (opens in new tab)`}
              className="inline-flex h-10 sm:h-11 items-center gap-1.5 rounded-lg border border-line px-3.5 sm:px-4 text-[13px] sm:text-[14px] font-medium text-fg2 transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              <Github size={15} aria-hidden /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function PreviewWrap({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = "relative block aspect-[16/10] overflow-hidden bg-elevated";
  return (
    <a href={href} aria-label="View project details" className={cls}>
      {children}
    </a>
  );
}
