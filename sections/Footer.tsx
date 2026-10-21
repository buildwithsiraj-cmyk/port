import { portfolio } from "@/data/portfolio";

export function Footer() {
  const { contact } = portfolio;
  const links = [
    contact.email && { href: `mailto:${contact.email}`, label: "Email" },
    contact.linkedin && { href: contact.linkedin, label: "LinkedIn" },
    contact.instagram && { href: contact.instagram, label: "Instagram" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer className="border-t border-line py-8 w-full min-w-0">
      <div className="container-x flex flex-col gap-4 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
        <div className="min-w-0">
          <span className="font-mono tracking-[0.12em] text-fg2">{portfolio.wordmark}</span>
          <span className="mx-2" aria-hidden>·</span>
          <span className="break-words">{portfolio.title}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 min-w-0">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="transition-colors hover:text-fg">{l.label}</a>
          ))}
          <span className="whitespace-nowrap">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
