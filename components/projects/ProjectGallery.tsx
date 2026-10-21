"use client";

import { useEffect, useRef } from "react";
import { registerGsap, MQ, EASE, T } from "@/lib/animations/gsap";
import { motionScale } from "@/lib/animations/capability";
import type { Project } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";

// Auto rhythm (12-col rows): 12 | 6 6 | 7 5 | 5 7 ... repeats. Override per project via `size`.
const RHYTHM = [12, 6, 6, 7, 5, 5, 7] as const;
const SPAN: Record<number, string> = {
  12: "sm:col-span-2 lg:col-span-12",
  7: "lg:col-span-7",
  6: "lg:col-span-6",
  5: "lg:col-span-5",
};

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projects.length) return;
    const { gsap } = registerGsap();
    const mm = gsap.matchMedia(root);
    const items = () => gsap.utils.toArray<HTMLElement>("[data-project]");

    // Desktop + tablet: scroll-linked depth. Enter from depth, hold flat (readable), recede slightly on exit.
    mm.add(`${MQ.desktop}`, () => {
      const k = motionScale(); // lighter on laptops / constrained devices
      items().forEach((el) => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top 105%", end: "bottom -5%", scrub: 0.5 },
        });
        tl.fromTo(el, { opacity: 0, y: 70 * k, z: -140 * k, rotationX: 9 * k, scale: 1 - 0.06 * k, transformPerspective: 1200 },
          { opacity: 1, y: 0, z: 0, rotationX: 0, scale: 1, duration: 0.3 })
          .to(el, { duration: 0.45 })
          .to(el, { opacity: 0.55, z: -80 * k, rotationX: -3 * k, scale: 1 - 0.03 * k, duration: 0.25 });
      });
    });

    // Tablet / mobile: light one-shot reveals.
    mm.add(`${MQ.tablet}, ${MQ.mobile}`, () => {
      items().forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1, duration: T.card, ease: EASE,
            delay: window.innerWidth >= 640 ? (i % 2) * 0.1 : 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
      });
    });

    return () => mm.revert();
  }, [projects]);

  return (
    <div ref={root} className="perspective-root grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
      {projects.map((p, i) => (
        <div
          key={`${p.title}-${i}`}
          data-project
          className={`will-change-transform ${SPAN[p.size ?? RHYTHM[i % RHYTHM.length]]}`}
        >
          <ProjectCard project={p} priority={i < 2} />
        </div>
      ))}
    </div>
  );
}
