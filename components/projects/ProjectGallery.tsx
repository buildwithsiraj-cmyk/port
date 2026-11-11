"use client";

import { useEffect, useRef } from "react";
import { registerGsap, MQ, EASE, T } from "@/lib/animations/gsap";
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

    // Smooth, hardware-accelerated one-shot reveals across all viewports
    mm.add(`${MQ.desktop}, ${MQ.tablet}, ${MQ.mobile}`, () => {
      items().forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: T.card,
            ease: EASE,
            delay: window.innerWidth >= 640 ? (i % 2) * 0.08 : 0,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            clearProps: "transform,willChange",
          }
        );
      });
    });

    return () => mm.revert();
  }, [projects]);

  return (
    <div ref={root} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
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
