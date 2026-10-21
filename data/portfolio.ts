import projectData from "./projects.json";

export type ProjectScreenshot = {
  url: string;
  alt: string;
  type?: "desktop" | "mobile";
  title?: string;
};

export type Project = {
  slug: string;
  title: string;
  description?: string;
  overview?: string;
  features?: string[];
  technologies?: string[];
  screenshots?: ProjectScreenshot[];
  /** Path under /public, e.g. "/projects/my-app.png" */
  image?: string;
  imageAlt?: string;
  category?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  /** Detail page URL, e.g. "/work/feathers-and-fur" */
  href?: string;
  /** Desktop width in the 12-col grid (12 | 7 | 6 | 5). Omit for automatic editorial rhythm. */
  size?: 12 | 7 | 6 | 5;
};

type ProjectEntry = Project;

export type Portfolio = {
  name: string;
  wordmark: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string;
  about: string;
  /** Closing line under the About intro */
  aboutCta: string;
  /** Services list shown in About — edit freely */
  services: { title: string; description: string }[];
  /** Optional: provide a real image under /public to show it in About */
  profileImage?: string;
  /** Portrait shown in the hero (path under /public) */
  heroPortrait?: string;
  siteUrl?: string;
  contact: { email?: string; phone?: string; instagram?: string; linkedin?: string };
  projects: Project[];
};

export const portfolio: Portfolio = {
  name: "Siraj KS",
  wordmark: "SIRAJ KS",
  title: "Gen AI Engineer | Data Engineer | Full Stack Developer",
  eyebrow: "GEN AI · DATA ENGINEERING · FULL STACK DEVELOPMENT",
  headline: "I build things for the web, data, and AI.",
  intro:
    "I'm Siraj KS, a developer working across Generative AI, data engineering, and full-stack development. This is a collection of my work.",
  about:
    "I help businesses strengthen their digital presence, reach the right audience, and turn more opportunities into customers through modern websites, AI-powered solutions, and digital automation.",
  aboutCta:
    "If you're looking to grow your business, let's connect and explore how we can work together.",
  services: [
    {
      title: "Website & Web App Development",
      description:
        "Modern, responsive websites and web applications designed to showcase businesses and deliver great user experiences.",
    },
    {
      title: "AI & Business Automation",
      description:
        "Intelligent solutions that streamline repetitive tasks and help businesses work more efficiently.",
    },
    {
      title: "CRM, WhatsApp & Email Automation",
      description:
        "Connected customer management and communication workflows to simplify follow-ups and manage leads.",
    },
    {
      title: "AI Analytics & Business Software",
      description:
        "Practical digital tools and data-driven solutions that help businesses manage information and improve workflows.",
    },
  ],
  profileImage: undefined,
  heroPortrait: undefined,
  // Set to your real domain once deployed, e.g. "https://example.com"
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  contact: {
    email: "buildwithsiraj@gmail.com",
    phone: "+919176619665",
    instagram: "https://www.instagram.com/buildwithsiraj_/",
    linkedin: "https://www.linkedin.com/in/sirajuddin-ks/",
  },
  // Edit data/projects.json to add/remove projects. Screenshot: /projects/<slug>.webp (run `npm run capture -- <slug>`).
  projects: (projectData as ProjectEntry[]).map((p) => ({
    ...p,
    href: p.href ?? `/work/${p.slug}`,
    image: p.image ?? `/projects/${p.slug}.webp`,
    imageAlt: p.imageAlt ?? `Screenshot of the ${p.title} website`,
  })),
};
