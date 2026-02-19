// ============================================================
// Portfolio Type Definitions
// ============================================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  techStack: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  role: string;
  duration: string;
  impact: string[];
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  coursework?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools"
  | "Languages";

export interface SocialLink {
  id?: string;
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  id?: string;
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
  labelKey: string;
}
