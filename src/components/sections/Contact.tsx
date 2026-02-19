"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import type { PersonalInfo } from "@/types";

const socialIconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  mail: Mail,
};

export default function Contact({
  personalInfo,
}: {
  personalInfo: PersonalInfo | null;
}) {
  if (!personalInfo) return null;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate sending (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("sent");

    // Reset after 3s
    setTimeout(() => {
      setStatus("idle");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <SectionWrapper
      id="contact"
      className="bg-gradient-to-b from-blue-50/50 via-violet-50/40 to-slate-50/60 dark:bg-neutral-900/30 dark:from-neutral-900/30 dark:via-neutral-900/30 dark:to-neutral-900/30"
    >
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a project in mind? Let's build something amazing together."
      />

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8 lg:col-span-2"
        >
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Let&apos;s Connect
            </h3>
            <p className="mt-2 leading-relaxed text-neutral-600 dark:text-neutral-400">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision. Drop me a message and
              I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Email
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {personalInfo.email}
                </p>
              </div>
            </a>

            {personalInfo.phone && (
              <a
                href={`tel:${personalInfo.phone}`}
                className="group flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-100 dark:bg-green-950/50 dark:text-green-400">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    Phone
                  </p>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>
            )}

            <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Location
                </p>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Find me on
            </h4>
            <div className="flex gap-3">
              {personalInfo.socialLinks.map((link) => {
                const Icon = socialIconMap[link.icon] || Mail;
                return (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-blue-100 bg-white text-slate-600 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:shadow-none dark:hover:border-blue-700 dark:hover:text-blue-400"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:bg-neutral-800"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:bg-neutral-800"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formState.subject}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, subject: e.target.value }))
                }
                placeholder="Project Inquiry"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:bg-neutral-800"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, message: e.target.value }))
                }
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-colors placeholder:text-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 dark:focus:border-blue-500 dark:focus:bg-neutral-800"
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-70"
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
            >
              {status === "idle" && (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
              {status === "sending" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              )}
              {status === "sent" && (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent!
                </>
              )}
              {status === "error" && "Failed — Try Again"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
