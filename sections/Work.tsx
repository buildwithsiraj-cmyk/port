import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function Work() {
  const { projects } = portfolio;
  return (
    <section id="work" aria-labelledby="work-title" className="section-y border-t border-line">
      <div className="container-x">
        <Reveal className="mb-12 max-w-[640px]">
          <p className="label mb-4">01 — Work</p>
          <h2 id="work-title" className="h-section">Selected Work.</h2>
          <p className="mt-4 text-fg2">A collection of projects, experiments, and things I&apos;ve built.</p>
        </Reveal>

        {projects.length > 0 ? (
          <ProjectGallery projects={projects} />
        ) : (
          <Reveal className="flex min-h-[260px] items-center justify-center rounded-[12px] border border-dashed border-line bg-card/40 px-6 text-center">
            <p className="text-[14px] text-fg2">Projects are being added. Check back soon.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
