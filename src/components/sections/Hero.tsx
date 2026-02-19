"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  ChevronDown,
} from "lucide-react";
import type { PersonalInfo } from "@/types";
import Image from "next/image";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

// Animated floating particles
function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-blue-500/30 dark:bg-blue-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// 3D Rotating gradient orb
function GradientOrb() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full opacity-50 blur-[100px] dark:opacity-30 sm:h-[600px] sm:w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 40%, rgba(236,72,153,0.1) 70%, transparent 100%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full opacity-35 blur-[80px] dark:opacity-20 sm:h-[400px] sm:w-[400px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(59,130,246,0.2) 60%, transparent 100%)",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Animated grid background
function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.06)_1px,transparent_1px)]" />
    </div>
  );
}

export default function Hero({
  personalInfo,
}: {
  personalInfo: PersonalInfo | null;
}) {
  if (!personalInfo) return null;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/50 dark:bg-neutral-950 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-950"
    >
      <GridBackground />
      <GradientOrb />
      <FloatingParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[1fr_auto]"
        >
          {/* Left: Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Status badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-8 max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Hi, I&apos;m{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl font-medium text-neutral-600 dark:text-neutral-400 sm:text-2xl"
            >
              {personalInfo.title}
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-500"
            >
              {personalInfo.tagline} I craft high-performance web applications
              with{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                React
              </span>
              ,{" "}
              <span className="font-semibold text-green-600 dark:text-green-400">
                Node.js
              </span>
              , and modern cloud technologies that deliver real business impact.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/25 transition-all hover:shadow-2xl hover:shadow-blue-500/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href={personalInfo.resumeUrl}
                download
                className="flex items-center justify-center gap-2 rounded-full border-2 border-neutral-200 bg-white px-8 py-4 text-base font-semibold text-neutral-900 transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-4"
            >
              {personalInfo.socialLinks.map((link, i) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200/60 bg-white text-slate-600 shadow-sm shadow-blue-500/5 backdrop-blur-sm transition-all hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:shadow-blue-500/10 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-400 dark:shadow-none dark:hover:border-blue-700 dark:hover:text-blue-400"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                    aria-label={link.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Tech stack marquee */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-4 text-sm text-neutral-400 dark:text-neutral-600"
            >
              <span className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
              <span className="font-mono tracking-wider uppercase">
                React &bull; Node.js &bull; TypeScript &bull; Next.js &bull;
                MongoDB &bull; PostgreSQL
              </span>
              <span className="h-px w-12 bg-neutral-300 dark:bg-neutral-700" />
            </motion.div>
          </div>

          {/* Right: Profile Picture */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
              {/* Animated gradient ring */}
              <motion.div
                className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 opacity-40 blur-lg" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-blue-100 to-violet-100 shadow-2xl dark:border-neutral-900 dark:from-blue-950 dark:to-violet-950">
                <Image
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Fallback initials if image not found */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-blue-400/60 dark:text-blue-500/40 sm:text-7xl lg:text-8xl">
                  {personalInfo.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-6 w-6 text-neutral-400 dark:text-neutral-600" />
      </motion.div>
    </section>
  );
}
