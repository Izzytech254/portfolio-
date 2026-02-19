"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Skill, SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

const categories: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Languages",
];

const categoryColors: Record<SkillCategory, string> = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-green-500 to-emerald-500",
  Database: "from-orange-500 to-amber-500",
  DevOps: "from-violet-500 to-purple-500",
  Tools: "from-pink-500 to-rose-500",
  Languages: "from-indigo-500 to-blue-500",
};

const categoryBgColors: Record<SkillCategory, string> = {
  Frontend:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  Backend:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  Database:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  DevOps:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800",
  Tools:
    "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800",
  Languages:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
};

function SkillBar({
  name,
  level,
  category,
  delay,
}: {
  name: string;
  level: number;
  category: SkillCategory;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-800 dark:text-neutral-200">
          {name}
        </span>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          {level}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <motion.div
          className={cn(
            "h-full rounded-full bg-gradient-to-r",
            categoryColors[category],
          )}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        title="Skills & Expertise"
        subtitle="Technologies I use to bring ideas to life"
      />

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        <motion.button
          onClick={() => setActiveCategory("All")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-all",
            activeCategory === "All"
              ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              activeCategory === cat
                ? categoryBgColors[cat]
                : "border-neutral-200 text-neutral-600 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {activeCategory === "All"
            ? categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                return (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none"
                  >
                    <h3
                      className={cn(
                        "mb-6 inline-flex rounded-full border px-3 py-1 text-sm font-semibold",
                        categoryBgColors[cat],
                      )}
                    >
                      {cat}
                    </h3>
                    <div className="space-y-4">
                      {catSkills.map((skill, i) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          category={skill.category}
                          delay={i * 0.05}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })
            : filteredSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        categoryBgColors[skill.category],
                      )}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                    <motion.div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r",
                        categoryColors[skill.category],
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
