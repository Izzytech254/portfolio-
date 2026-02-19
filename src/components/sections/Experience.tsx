"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import TechBadge from "@/components/ui/TechBadge";
import type { Experience as ExperienceType } from "@/types";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "full-time":
    "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
  "part-time":
    "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800",
  contract:
    "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800",
  freelance:
    "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-950/50 dark:text-violet-400 dark:border-violet-800",
  internship:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
};

export default function Experience({
  experiences,
}: {
  experiences: ExperienceType[];
}) {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        title="Work Experience"
        subtitle="My professional journey — building, shipping, and scaling."
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-blue-600 via-violet-600 to-transparent md:left-1/2 md:block md:-translate-x-px" />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={cn(
                "relative grid gap-8 md:grid-cols-2",
                i % 2 === 0 ? "" : "md:direction-rtl",
              )}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 hidden md:left-1/2 md:block md:-translate-x-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="flex h-5 w-5 items-center justify-center rounded-full border-4 border-blue-600 bg-white dark:bg-neutral-950"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                </motion.div>
              </div>

              {/* Card */}
              <div
                className={cn(
                  "md:col-span-1",
                  i % 2 === 0
                    ? "md:col-start-1 md:pr-12"
                    : "md:col-start-2 md:pl-12",
                )}
                style={{ direction: "ltr" }}
              >
                <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800 sm:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="mt-1 text-base font-semibold text-blue-600 dark:text-blue-400">
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-3 py-1 text-xs font-medium capitalize",
                        typeColors[exp.type],
                      )}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                      Key Achievements
                    </h4>
                    <ul className="mt-2 space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
