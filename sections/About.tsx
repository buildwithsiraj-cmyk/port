import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { ServicesList } from "@/components/ServicesList";

export function About() {
  const { profileImage, about, aboutCta, services, name } = portfolio;
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
        </Reveal>
        <div className="lg:col-span-7">
          <p className="label mb-4">Services &amp; Expertise</p>
          <ServicesList services={services} />
        </div>
      </div>
    </section>
  );
}
