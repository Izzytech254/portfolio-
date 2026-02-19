"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCard from "@/components/ui/AnimatedCard";
import TechBadge from "@/components/ui/TechBadge";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const projectCategories = ["All", "Fullstack", "Frontend", "Backend", "AI/ML"];

// ============================================================
// Project Card
// ============================================================
function ProjectCard({
  project,
  index,
  onOpenModal,
}: {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}) {
  return (
    <AnimatedCard delay={index * 0.1}>
      <div className="group h-full overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950 dark:to-violet-950">
          {/* Placeholder gradient with project initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black text-blue-300/50 dark:text-blue-700/50">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 transition-all duration-300 group-hover:bg-black/60">
            <motion.button
              onClick={() => onOpenModal(project)}
              className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="View details"
            >
              <Eye className="h-5 w-5" />
            </motion.button>
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all delay-150 duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Live demo"
              >
                <ExternalLink className="h-5 w-5" />
              </motion.a>
            )}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              {project.category}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              {project.duration}
            </span>
          </div>

          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action links */}
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="flex-1 rounded-lg bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            >
              Case Study
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-blue-700 dark:hover:text-blue-400"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-blue-700 dark:hover:text-blue-400"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

// ============================================================
// Project Modal
// ============================================================
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-blue-100 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-600 backdrop-blur-sm transition-colors hover:bg-neutral-100 dark:bg-neutral-800/80 dark:text-neutral-400 dark:hover:bg-neutral-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header image */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950 dark:to-violet-950">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-blue-300/50 dark:text-blue-700/50">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
          {project.featured && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1.5 text-sm font-bold text-white shadow-lg">
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              {project.category}
            </span>
            <span>&bull;</span>
            <span>{project.role}</span>
            <span>&bull;</span>
            <span>{project.duration}</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
            {project.title}
          </h2>

          <p className="mt-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
            {project.longDescription}
          </p>

          {/* Tech Stack */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Tech Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} size="md" />
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Key Highlights
            </h3>
            <ul className="mt-3 space-y-2">
              {project.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Impact & Results
            </h3>
            <ul className="mt-3 space-y-2">
              {project.impact.map((imp) => (
                <li
                  key={imp}
                  className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                  {imp}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/projects/${project.slug}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              View Full Case Study
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 px-6 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// Featured Carousel
// ============================================================
function FeaturedCarousel({
  onOpenModal,
  projects,
}: {
  onOpenModal: (p: Project) => void;
  projects: Project[];
}) {
  const featured = projects.filter((p) => p.featured);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));

  if (featured.length === 0) return null;

  const project = featured[current];

  return (
    <div className="mb-16 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
      <div className="grid lg:grid-cols-2">
        {/* Image Side */}
        <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-950 dark:to-violet-950 lg:aspect-auto lg:min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="text-7xl font-black text-blue-300/40 dark:text-blue-700/40">
                {project.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
              Featured
            </span>
          </div>
          {/* Nav arrows */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-neutral-700 backdrop-blur-sm transition-colors hover:bg-white dark:bg-neutral-800/80 dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-4 flex gap-1.5">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === current ? "w-6 bg-white" : "w-2 bg-white/50",
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Content Side */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"
          >
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {project.category} &bull; {project.role}
            </span>
            <h3 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
            <div className="mt-4 space-y-1">
              {project.impact.slice(0, 3).map((imp) => (
                <p
                  key={imp}
                  className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {imp}
                </p>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onOpenModal(project)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                View Details
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================
// Main Projects Section
// ============================================================
export default function Projects({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper
      id="projects"
      className="bg-gradient-to-b from-violet-50/60 via-blue-50/40 to-slate-50/60 dark:bg-neutral-900/30 dark:from-neutral-900/30 dark:via-neutral-900/30 dark:to-neutral-900/30"
    >
      <SectionHeading
        title="Featured Projects"
        subtitle="A showcase of my best work — engineered for performance, designed for impact."
      />

      {/* Featured Carousel */}
      <FeaturedCarousel onOpenModal={setModalProject} projects={projects} />

      {/* Filter */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {projectCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all",
              activeFilter === cat
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Project Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpenModal={setModalProject}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal
            project={modalProject}
            onClose={() => setModalProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
