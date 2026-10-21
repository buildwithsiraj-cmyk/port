"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Layers, Monitor, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/data/portfolio";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/sections/Footer";

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
  currentIndex,
  totalProjects,
}: {
  project: Project;
  prevProject: Project;
  nextProject: Project;
  currentIndex: number;
  totalProjects: number;
}) {
  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : project.image
    ? [{ url: project.image, alt: project.imageAlt || project.title, type: "desktop" as const, title: "Website Preview" }]
    : [];

  const [activeShot, setActiveShot] = useState<number>(0);
  const currentScreenshot = screenshots[activeShot] || screenshots[0];

  const isWebApp = project.category?.toLowerCase().includes("app");
  const ctaText = isWebApp ? "Open Live Application" : "Visit Live Website";

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0B0D10] text-[#F5F5F0] pt-[84px] pb-16">
        {/* Top Breadcrumb & Navigation Bar */}
        <div className="border-b border-[#292E37] bg-[#0B0D10]/80 backdrop-blur-md sticky top-[72px] z-30">
          <div className="container-x flex items-center justify-between h-14">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[14px] text-[#A1A6B0] hover:text-[#6C8CFF] transition-colors"
            >
              <ArrowLeft size={16} aria-hidden />
              <span>Back to All Projects</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] tracking-wider text-[#737985]">
                {String(currentIndex).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
              </span>
              <div className="h-4 w-px bg-[#292E37]" />
              <div className="flex items-center gap-1">
                <Link
                  href={prevProject.href ?? `/work/${prevProject.slug}`}
                  aria-label={`Previous project: ${prevProject.title}`}
                  className="p-2 rounded-md hover:bg-white/[0.05] text-[#A1A6B0] hover:text-[#F5F5F0] transition-colors"
                >
                  <ArrowLeft size={15} />
                </Link>
                <Link
                  href={nextProject.href ?? `/work/${nextProject.slug}`}
                  aria-label={`Next project: ${nextProject.title}`}
                  className="p-2 rounded-md hover:bg-white/[0.05] text-[#A1A6B0] hover:text-[#F5F5F0] transition-colors"
                >
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Project Hero Header */}
        <section className="container-x pt-10 pb-8">
          <div className="max-w-[840px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="label !text-[#6C8CFF] px-2.5 py-1 rounded-md bg-[#6C8CFF]/10 border border-[#6C8CFF]/20">
                  {project.category || "Project"}
                </span>
                {project.tags?.map((t) => (
                  <span key={t} className="label px-2.5 py-1 rounded-md border border-[#292E37] bg-white/[0.02]">
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-semibold leading-tight tracking-[-0.03em] text-[#F5F5F0]">
                {project.title}
              </h1>

              <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-[#A1A6B0] max-w-[720px]">
                {project.overview || project.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary shadow-[0_10px_30px_-10px_rgba(108,140,255,0.4)]"
                  >
                    <span>{ctaText}</span>
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <GithubIcon size={16} aria-hidden />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Primary Interactive Screenshot Showcase */}
        {screenshots.length > 0 && (
          <section className="container-x py-6">
            <div className="rounded-[16px] border border-[#292E37] bg-[#12151A] overflow-hidden shadow-2xl">
              {/* Browser/Window Bar Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#292E37] bg-[#0E1116]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
                  <span className="ml-3 font-mono text-[12px] text-[#737985] hidden sm:inline-block">
                    {project.demo ? new URL(project.demo).hostname : project.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveShot(idx)}
                      className={`px-3 py-1 text-[12px] rounded-md transition-colors flex items-center gap-1.5 ${
                        activeShot === idx
                          ? "bg-[#6C8CFF]/20 text-[#6C8CFF] border border-[#6C8CFF]/40 font-medium"
                          : "text-[#737985] hover:text-[#A1A6B0] border border-transparent"
                      }`}
                    >
                      {s.type === "mobile" ? <Smartphone size={13} /> : <Monitor size={13} />}
                      <span className="hidden sm:inline">{s.title || `View ${idx + 1}`}</span>
                    </button>
                  ))}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded text-[#737985] hover:text-[#6C8CFF] transition-colors ml-1"
                      title="Open in new tab"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Main Preview Screen */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#0B0D10] overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeShot}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentScreenshot.url}
                      alt={currentScreenshot.alt || `${project.title} screenshot`}
                      fill
                      priority
                      sizes="(min-width: 1440px) 1300px, 100vw"
                      className={`object-contain ${currentScreenshot.type === "mobile" ? "p-4 sm:p-6" : ""}`}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Screenshot Caption */}
              <div className="px-5 py-3 border-t border-[#292E37] bg-[#0E1116] flex items-center justify-between text-[13px] text-[#A1A6B0]">
                <span>
                  Captured from live website: <strong className="text-[#F5F5F0]">{currentScreenshot.title || project.title}</strong>
                </span>
                <span className="font-mono text-[11px] text-[#737985] uppercase tracking-wider">
                  {currentScreenshot.type || "Live capture"}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip / Gallery Browser */}
            {screenshots.length > 1 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveShot(idx)}
                    className={`relative rounded-xl border p-1 text-left overflow-hidden transition-all duration-200 group ${
                      activeShot === idx
                        ? "border-[#6C8CFF] bg-[#6C8CFF]/5 shadow-md shadow-[#6C8CFF]/10"
                        : "border-[#292E37] bg-[#12151A]/60 hover:border-[#3a414d]"
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/40">
                      <Image
                        src={shot.url}
                        alt={shot.alt}
                        fill
                        sizes="(min-width: 640px) 33vw, 50vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2 flex items-center justify-between">
                      <span className="text-[13px] font-medium truncate text-[#F5F5F0]">
                        {shot.title || `Shot ${idx + 1}`}
                      </span>
                      <span className="text-[11px] font-mono text-[#737985] uppercase">
                        {shot.type || "desktop"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Project Information: Features & Technologies */}
        <section className="container-x py-10">
          <div className="grid gap-10 md:grid-cols-12">
            {/* Features (if verified) */}
            {project.features && project.features.length > 0 && (
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={18} className="text-[#6C8CFF]" aria-hidden />
                  <h2 className="text-[20px] font-semibold text-[#F5F5F0]">Key Highlights &amp; Features</h2>
                </div>
                <ul className="grid gap-3">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="flex items-start gap-3 rounded-[12px] border border-[#292E37] bg-[#12151A] p-4 text-[15px] leading-relaxed text-[#A1A6B0] transition-colors hover:border-[#6C8CFF]/40"
                    >
                      <CheckCircle2 size={18} className="text-[#6C8CFF] shrink-0 mt-0.5" aria-hidden />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies & Metadata */}
            <div className={project.features?.length ? "md:col-span-5" : "md:col-span-8"}>
              {project.technologies && project.technologies.length > 0 && (
                <div className="rounded-[16px] border border-[#292E37] bg-[#12151A] p-6 mb-6 transition-all duration-300 hover:border-accent/40">
                  <h2 className="text-[18px] font-semibold text-[#F5F5F0] mb-4">Technologies &amp; Tools</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg border border-[#292E37] bg-white/[0.02] text-[13.5px] font-medium text-[#F5F5F0] transition-all duration-200 hover:border-[#6C8CFF]/50 hover:bg-[#6C8CFF]/10 hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Live Link Banner */}
              {project.demo && (
                <div className="rounded-[16px] border border-[#6C8CFF]/20 bg-gradient-to-br from-[#6C8CFF]/10 to-transparent p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_12px_32px_-12px_rgba(108,140,255,0.3)]">
                  <p className="label !text-[#6C8CFF] mb-2">Live Deployment</p>
                  <p className="text-[15px] text-[#A1A6B0] mb-4">
                    Experience the production deployment directly in your browser.
                  </p>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                  >
                    <span>{ctaText}</span>
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <section className="container-x pt-12 border-t border-[#292E37] mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href={prevProject.href ?? `/work/${prevProject.slug}`}
              className="flex items-center gap-3 text-left group"
            >
              <div className="h-10 w-10 rounded-full border border-[#292E37] flex items-center justify-center text-[#A1A6B0] group-hover:border-[#6C8CFF] group-hover:text-[#6C8CFF] transition-colors">
                <ArrowLeft size={16} />
              </div>
              <div>
                <span className="block text-[12px] font-mono uppercase text-[#737985]">Previous</span>
                <span className="block text-[15px] font-medium text-[#F5F5F0] group-hover:text-[#6C8CFF] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </Link>

            <Link
              href="/#work"
              className="btn btn-ghost text-[14px]"
            >
              Back to All Projects
            </Link>

            <Link
              href={nextProject.href ?? `/work/${nextProject.slug}`}
              className="flex items-center gap-3 text-right group"
            >
              <div>
                <span className="block text-[12px] font-mono uppercase text-[#737985]">Next</span>
                <span className="block text-[15px] font-medium text-[#F5F5F0] group-hover:text-[#6C8CFF] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="h-10 w-10 rounded-full border border-[#292E37] flex items-center justify-center text-[#A1A6B0] group-hover:border-[#6C8CFF] group-hover:text-[#6C8CFF] transition-colors">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
