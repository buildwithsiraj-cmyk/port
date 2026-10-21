import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import { ProjectDetailView } from "./ProjectDetailView";

export function generateStaticParams() {
  return portfolio.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Project Details | Siraj KS`,
    description: project.overview || project.description,
    openGraph: {
      title: `${project.title} — Siraj KS`,
      description: project.overview || project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = portfolio.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = portfolio.projects[index];
  const prevProject = index > 0 ? portfolio.projects[index - 1] : portfolio.projects[portfolio.projects.length - 1];
  const nextProject = index < portfolio.projects.length - 1 ? portfolio.projects[index + 1] : portfolio.projects[0];

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      currentIndex={index + 1}
      totalProjects={portfolio.projects.length}
    />
  );
}
