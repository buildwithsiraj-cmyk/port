import { ArrowUpRight, Globe, Mail, Phone } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/icons";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/Reveal";

type Icon = React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
type Item = { href: string; label: string; detail: string; icon: Icon; external: boolean; featured?: boolean };

export function Contact() {
  const { email, phone, instagram, linkedin, website } = portfolio.contact;
  const items = [
    website && {
      href: website,
      label: "Business Agency",
      detail: portfolio.business.domain,
      icon: Globe,
      external: true,
      featured: true,
    },
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
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="label mb-4">03 — Contact</p>
            <h2 id="contact-title" className="h-section">Have something in mind? Let&apos;s build it.</h2>
            <p className="mt-4 max-w-[460px] text-fg2">
              Interested in my work, need agency services via <strong className="text-fg font-medium">{portfolio.business.name}</strong>, or want to collaborate? Get in touch directly.
            </p>
          </Reveal>
          <Reveal className="w-full min-w-0 lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2 w-full min-w-0">
              {items.map(({ href, label, detail, icon: Icon, external, featured }) => (
                <li key={label} className={`w-full min-w-0 ${featured ? "sm:col-span-2" : ""}`}>
                  <a
                    href={href}
                    aria-label={external ? `${label} (opens in a new tab)` : `${label}: ${detail}`}
                    className={`group flex min-h-[72px] w-full min-w-0 items-center gap-3.5 sm:gap-4 rounded-[12px] border px-4 sm:px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none ${
                      featured
                        ? "border-accent/40 bg-accent/[0.04] hover:border-accent hover:bg-accent/[0.08] shadow-[0_8px_24px_-12px_rgba(108,140,255,0.25)]"
                        : "border-line hover:border-accent/50 hover:bg-accent/[0.05]"
                    }`}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      featured
                        ? "border-accent/40 bg-accent/10 text-accent group-hover:border-accent group-hover:bg-accent/20"
                        : "border-line text-fg2 group-hover:border-accent/50 group-hover:text-accent"
                    }`}>
                      <Icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="block text-[15px] font-medium text-fg">{label}</span>
                        {featured && (
                          <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] text-accent font-semibold tracking-wider">
                            OFFICIAL
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-[13px] text-muted">{detail}</span>
                    </span>
                    <ArrowUpRight size={16} aria-hidden className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
