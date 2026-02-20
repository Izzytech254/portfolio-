import prisma from "@/lib/prisma";
import ProjectCaseStudy from "./ProjectCaseStudy";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({ select: { slug: true } });
    return projects.map((project) => ({ slug: project.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  const relatedProjects = await prisma.project.findMany({
    where: { category: project.category, id: { not: project.id } },
    take: 3,
    orderBy: { order: "asc" },
  });

  const plainProject = JSON.parse(JSON.stringify(project));
  const plainRelated = JSON.parse(JSON.stringify(relatedProjects));

  return (
    <ProjectCaseStudy project={plainProject} relatedProjects={plainRelated} />
  );
}
