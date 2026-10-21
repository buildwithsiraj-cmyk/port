import { portfolio } from "@/data/portfolio";

export function Footer() {
  const { contact } = portfolio;
  const links = [
    contact.email && { href: `mailto:${contact.email}`, label: "Email" },
    contact.linkedin && { href: contact.linkedin, label: "LinkedIn" },
    contact.instagram && { href: contact.instagram, label: "Instagram" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="border-t border-line py-8">
      <div className="container-x flex flex-col gap-4 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono tracking-[0.12em] text-fg2">{portfolio.wordmark}</span>
          <span className="mx-2" aria-hidden>·</span>
          <span>{portfolio.title}</span>
        </div>
        <div className="flex items-center gap-5">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors hover:text-fg">{l.label}</a>
          ))}
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
