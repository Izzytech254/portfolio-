"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Heart,
  ArrowUp,
} from "lucide-react";
import type { PersonalInfo } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

export default function Footer({
  personalInfo,
}: {
  personalInfo: PersonalInfo | null;
}) {
  if (!personalInfo) return null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-blue-100 bg-gradient-to-b from-slate-50 to-blue-50/50 dark:border-neutral-800 dark:bg-neutral-950 dark:from-neutral-950 dark:to-neutral-950">
      {/* Scroll to top */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={scrollToTop}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-200 bg-white shadow-lg shadow-blue-500/10 transition-colors hover:bg-blue-50 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-none dark:hover:bg-neutral-800"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </motion.button>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          {/* Brand */}
          <motion.a
            href="#hero"
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              izzytech254
            </span>
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {personalInfo.socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-white text-slate-600 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:shadow-none dark:hover:border-blue-700 dark:hover:text-blue-400"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.platform}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-blue-200 to-transparent dark:via-neutral-700" />

          {/* Admin link */}
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-400"
          >
            Admin Dashboard
          </a>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500">
            <p className="flex items-center gap-1">
              Built with <Heart className="h-3.5 w-3.5 text-red-500" /> using
              Next.js & Tailwind CSS
            </p>
            <p>
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
