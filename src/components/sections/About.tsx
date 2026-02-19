"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Rocket, Users, Coffee, GitBranch } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import type { PersonalInfo } from "@/types";

const stats = [
  { icon: Code2, label: "Projects Completed", value: "30+" },
  { icon: Coffee, label: "Cups of Coffee", value: "2,000+" },
  { icon: GitBranch, label: "Git Commits", value: "5,000+" },
  { icon: Users, label: "Happy Clients", value: "15+" },
];

const highlights = [
  {
    icon: Code2,
    title: "Frontend Excellence",
    description:
      "I build pixel-perfect, accessible interfaces with React, Next.js, and modern CSS that delight users and drive engagement.",
  },
  {
    icon: Server,
    title: "Backend Mastery",
    description:
      "From RESTful APIs to real-time WebSocket systems, I architect robust Node.js backends that scale to millions of requests.",
  },
  {
    icon: Rocket,
    title: "Performance Obsessed",
    description:
      "Every millisecond matters. I optimize every layer — from database queries to bundle sizes — for lightning-fast experiences.",
  },
];

export default function About({
  personalInfo,
}: {
  personalInfo: PersonalInfo | null;
}) {
  if (!personalInfo) return null;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-b from-violet-50/60 via-blue-50/40 to-slate-50/60 dark:bg-neutral-900/30 dark:from-neutral-900/30 dark:via-neutral-900/30 dark:to-neutral-900/30"
    >
      <SectionHeading
        title="About Me"
        subtitle="Passionate about code. Driven by impact."
      />

      <div ref={ref} className="grid gap-16 lg:grid-cols-2">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Profile Picture */}
          <div className="relative mx-auto h-48 w-48 lg:mx-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 opacity-75 blur-sm" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl border-4 border-white bg-gradient-to-br from-blue-100 to-violet-100 shadow-xl dark:border-neutral-900 dark:from-blue-950 dark:to-violet-950">
              <Image
                src={personalInfo.avatar}
                alt={personalInfo.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-blue-400/50 dark:text-blue-500/30">
                {personalInfo.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Decorative element */}
            <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-blue-600 to-violet-600" />
            <div className="pl-6">
              <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                {personalInfo.bio}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                When I&apos;m not coding, you&apos;ll find me exploring new
                technologies, contributing to open-source projects, or sharing
                my knowledge through technical articles and mentorship. I
                believe in continuous learning and pushing the boundaries of
                what&apos;s possible on the web.
              </p>
            </div>
          </div>

          {/* Quick info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
              <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">
                Location
              </span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                {personalInfo.location}
              </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
              <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">
                Experience
              </span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                2+ Years
              </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
              <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">
                Specialty
              </span>
              <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                Fullstack Dev
              </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
              <span className="text-sm font-medium text-slate-500 dark:text-neutral-400">
                Availability
              </span>
              <p className="mt-1 font-semibold text-green-600 dark:text-green-400">
                Open to Work
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Highlights + Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="space-y-8"
        >
          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group flex gap-4 rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="group rounded-xl border border-blue-100 bg-white p-5 text-center shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800"
              >
                <stat.icon className="mx-auto h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
