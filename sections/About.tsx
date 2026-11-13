import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { ServicesList } from "@/components/ServicesList";

export function About() {
  const { profileImage, about, aboutCta, services, name } = portfolio;
  const { profileImage, about, aboutCta, services, name, business } = portfolio;
  return (
    <section id="about" aria-labelledby="about-title" className="relative section-y border-t border-line overflow-clip">
      {/* subtle grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(41,46,55,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(41,46,55,0.45) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 30% 40%, black 10%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 10%, transparent 75%)",
        }}
      />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="about-sticky lg:col-span-5">
          <p className="label mb-4">02 — About</p>
          <h2 id="about-title" className="h-section">A little about me.</h2>
          {profileImage && (
            <Image src={profileImage} alt={`Portrait of ${name}`} width={160} height={160}
              className="mt-6 h-40 w-40 rounded-[12px] border border-line object-cover" />
          )}
          <p className="mt-6 max-w-[480px] text-[17px] text-fg2">{about}</p>
          <p className="mt-4 max-w-[480px] text-[17px] text-fg2">{aboutCta}</p>

          {/* Business & Agency Card */}
          <div className="mt-8 pt-6 border-t border-line/60">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted block mb-2.5">
              Agency &amp; Consulting
            </span>
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${business.name} at ${business.domain} (opens in new tab)`}
              className="group inline-flex items-center gap-3.5 rounded-xl border border-line/80 bg-card/60 px-4 py-3 text-[14px] font-medium text-fg transition-all duration-200 hover:border-accent/50 hover:bg-accent/[0.04] shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/25 text-accent group-hover:bg-accent/20 transition-colors">
                <Globe size={17} aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-fg group-hover:text-accent transition-colors">
                  {business.name}
                </span>
                <span className="block text-[12px] text-muted font-mono">
                  {business.domain}
                </span>
              </span>
              <ArrowUpRight size={15} className="ml-1 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </a>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <p className="label mb-4">Services &amp; Expertise</p>
          <ServicesList services={services} />
        </div>
      </div>
    </section>
  );
}
