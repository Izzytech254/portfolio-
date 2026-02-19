"use client";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export default function TechBadge({ name, size = "sm" }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium transition-colors",
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
      )}
    >
      {name}
    </span>
  );
}
