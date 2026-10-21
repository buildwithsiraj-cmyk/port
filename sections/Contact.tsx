import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";
import { ProjectBuilder } from "@/sections/ProjectBuilder";

type Icon = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
type Item = { href: string; label: string; detail: string; icon: Icon; external: boolean };

export function Contact() {
  const { email, phone, instagram, linkedin } = portfolio.contact;
  const items = [
    email && { href: `mailto:${email}`, label: "Email Me", detail: email, icon: Mail, external: false },
    phone && { href: `tel:${phone}`, label: "Call Me", detail: "+91 91766 19665", icon: Phone, external: false },
    instagram && { href: instagram, label: "Instagram", detail: "@buildwithsiraj_", icon: InstagramIcon, external: true },
    linkedin && { href: linkedin, label: "LinkedIn", detail: "sirajuddin-ks", icon: LinkedinIcon, external: true },
  ].filter(Boolean) as Item[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative section-y border-t border-line overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(108,140,255,0.10), transparent 70%)" }} />
      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center mb-16 lg:mb-20">
          <Reveal className="lg:col-span-5">
            <p className="label mb-4">03 — Contact</p>
            <h2 id="contact-title" className="h-section">Have something in mind? Let&apos;s build it.</h2>
            <p className="mt-4 max-w-[460px] text-fg2">
              Interested in my work or want to collaborate on something interesting? Get in touch directly, or customize your project requirements below.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {items.map(({ href, label, detail, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={external ? `${label} (opens in a new tab)` : `${label}: ${detail}`}
                    className="group flex min-h-[72px] items-center gap-4 rounded-[12px] border border-line px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/[0.05] focus-visible:border-accent/60 focus-visible:outline-none"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg2 transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] text-fg">{label}</span>
                      <span className="block truncate text-[13px] text-muted">{detail}</span>
                    </span>
                    <ArrowUpRight size={16} aria-hidden className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Interactive Estimator nested cleanly within the Contact section */}
        <ProjectBuilder />
      </div>
    </section>
  );
}
