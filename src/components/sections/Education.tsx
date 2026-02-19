"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Education as EducationType } from "@/types";

export default function Education({
  education,
}: {
  education: EducationType[];
}) {
  return (
    <SectionWrapper
      id="education"
      className="bg-gradient-to-b from-slate-50/60 via-violet-50/40 to-blue-50/40 dark:bg-neutral-900/30 dark:from-neutral-900/30 dark:via-neutral-900/30 dark:to-neutral-900/30"
    >
      <SectionHeading
        title="Education"
        subtitle="The foundation of my technical expertise"
      />

      <div className="space-y-8">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-blue-600 dark:text-blue-400">
                      {edu.institution}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {edu.duration}
                    </p>
                    {edu.gpa && (
                      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600 dark:bg-green-950/50 dark:text-green-400">
                        GPA: {edu.gpa}
                      </p>
                    )}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mt-6">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    <Award className="h-4 w-4" />
                    Achievements
                  </h4>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {edu.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Coursework */}
              {edu.coursework && (
                <div className="rounded-xl border border-blue-100/80 bg-blue-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-800/50">
                  <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    <BookOpen className="h-4 w-4" />
                    Key Coursework
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {edu.coursework.map((course) => (
                      <li
                        key={course}
                        className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        <span className="h-1 w-1 rounded-full bg-blue-500" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
