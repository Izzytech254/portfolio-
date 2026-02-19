"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCard from "@/components/ui/AnimatedCard";
import type { Certification } from "@/types";

export default function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Industry-recognized credentials validating my expertise"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <AnimatedCard key={cert.id} delay={i * 0.1}>
            <div className="group h-full rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-blue-800">
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-110">
                <ShieldCheck className="h-7 w-7" />
              </div>

              {/* Content */}
              <h3 className="mt-4 text-base font-bold leading-tight text-neutral-900 dark:text-white">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                {cert.issuer}
              </p>

              {/* Meta */}
              <div className="mt-3 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Issued: {cert.date}
                </p>
                {cert.expiryDate && (
                  <p className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    Expires: {cert.expiryDate}
                  </p>
                )}
              </div>

              {/* Credential Link */}
              {cert.credentialUrl && (
                <motion.a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  whileHover={{ x: 3 }}
                >
                  Verify Credential
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.a>
              )}
            </div>
          </AnimatedCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
