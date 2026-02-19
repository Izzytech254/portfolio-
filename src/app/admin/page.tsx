"use client";

import {
  useState,
  useEffect,
  FormEvent,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  LayoutDashboard,
  FolderKanban,
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  LogOut,
  ChevronRight,
  Upload,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================================
// Types
// ============================================================
interface PersonalInfoData {
  id: string;
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar: string;
  resumeUrl: string;
  socialLinks: SocialLinkData[];
}

interface SocialLinkData {
  id?: string;
  platform: string;
  url: string;
  icon: string;
}

interface SkillData {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string;
}

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  techStack: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  role: string;
  duration: string;
  impact: string[];
}

interface ExperienceData {
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
  type: string;
}

interface EducationData {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
  coursework: string[];
}

interface CertificationData {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
}

type Section =
  | "overview"
  | "personal"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "certifications";

// ============================================================
// Shared styles
// ============================================================
const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white";

const btnPrimary =
  "flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl";

const btnSecondary =
  "rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800";

// ============================================================
// Shared UI Components
// ============================================================
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
      {title}
    </h2>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
}

function EmptyState({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 text-center dark:border-neutral-700">
      <Icon className="h-10 w-10 text-neutral-400" />
      <p className="mt-2 text-sm text-neutral-500">{label}</p>
    </div>
  );
}

function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

function SaveButton({ saving }: { saving: boolean }) {
  return (
    <button
      type="submit"
      disabled={saving}
      className={btnPrimary + " mt-2 w-full py-3"}
    >
      {saving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );
}

// ============================================================
// Toast Component
// ============================================================
function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-4 text-sm font-medium text-white shadow-2xl",
        type === "success" ? "bg-green-600" : "bg-red-600",
      )}
    >
      {type === "success" ? (
        <CheckCircle2 className="h-5 w-5" />
      ) : (
        <AlertCircle className="h-5 w-5" />
      )}
      {message}
    </motion.div>
  );
}

// ============================================================
// Component: Avatar Upload
// ============================================================
function AvatarUpload({
  currentUrl,
  onUrlChange,
  showToast,
}: {
  currentUrl: string;
  onUrlChange: (url: string) => void;
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        onUrlChange(result.url);
        showToast("Image uploaded!", "success");
      } else {
        showToast(result.error || "Upload failed", "error");
      }
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleUpload(file);
  };

  return (
    <FormField label="Profile Picture">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Preview */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
          {currentUrl ? (
            <Image
              src={currentUrl}
              alt="Avatar preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="h-8 w-8 text-neutral-400" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-5 transition-colors",
              dragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                : "border-neutral-300 hover:border-blue-400 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:border-blue-500 dark:hover:bg-neutral-800/50",
            )}
          >
            <Upload className="mb-1.5 h-5 w-5 text-neutral-400" />
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Click or drag & drop
            </p>
            <p className="text-xs text-neutral-400">
              JPEG, PNG, WebP, GIF, SVG — max 5 MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
          {/* Manual URL input */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 whitespace-nowrap">
              or paste URL:
            </span>
            <input
              value={currentUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="/profile.jpg or https://..."
              className={inputClass + " text-xs"}
            />
          </div>
        </div>
      </div>
    </FormField>
  );
}

// ============================================================
// Section: Personal Info
// ============================================================
function PersonalInfoSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [data, setData] = useState<PersonalInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/personal-info")
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch("/api/personal-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        showToast("Personal info updated!", "success");
      } else {
        showToast("Failed to update", "error");
      }
    } catch {
      showToast("Failed to update", "error");
    } finally {
      setSaving(false);
    }
  };

  const addSocialLink = () => {
    if (!data) return;
    setData({
      ...data,
      socialLinks: [...data.socialLinks, { platform: "", url: "", icon: "" }],
    });
  };

  const removeSocialLink = (index: number) => {
    if (!data) return;
    setData({
      ...data,
      socialLinks: data.socialLinks.filter((_, i) => i !== index),
    });
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLinkData,
    value: string,
  ) => {
    if (!data) return;
    const links = [...data.socialLinks];
    links[index] = { ...links[index], [field]: value };
    setData({ ...data, socialLinks: links });
  };

  if (loading) return <LoadingSpinner />;
  if (!data) return <p className="text-neutral-500">No personal info found.</p>;

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <SectionHeader title="Personal Information" />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full Name" required>
          <input
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={inputClass}
          />
        </FormField>
        <FormField label="Job Title" required>
          <input
            required
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField label="Tagline">
        <input
          value={data.tagline}
          onChange={(e) => setData({ ...data, tagline: e.target.value })}
          className={inputClass}
        />
      </FormField>
      <FormField label="Bio">
        <textarea
          rows={4}
          value={data.bio}
          onChange={(e) => setData({ ...data, bio: e.target.value })}
          className={inputClass + " resize-none"}
        />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email" required>
          <input
            required
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className={inputClass}
          />
        </FormField>
        <FormField label="Phone">
          <input
            value={data.phone || ""}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField label="Location">
        <input
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className={inputClass}
        />
      </FormField>
      {/* Avatar Upload */}
      <AvatarUpload
        currentUrl={data.avatar}
        onUrlChange={(url) => setData({ ...data, avatar: url })}
        showToast={showToast}
      />
      <FormField label="Resume URL">
        <input
          value={data.resumeUrl}
          onChange={(e) => setData({ ...data, resumeUrl: e.target.value })}
          className={inputClass}
        />
      </FormField>
      {/* Social Links */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Social Links
          </label>
          <button
            type="button"
            onClick={addSocialLink}
            className={btnPrimary + " py-1.5 px-3 text-xs"}
          >
            <Plus className="h-3 w-3" /> Add Link
          </button>
        </div>
        <div className="space-y-3">
          {data.socialLinks.map((link, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Platform"
                value={link.platform}
                onChange={(e) =>
                  updateSocialLink(i, "platform", e.target.value)
                }
                className={inputClass + " flex-1"}
              />
              <input
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateSocialLink(i, "url", e.target.value)}
                className={inputClass + " flex-[2]"}
              />
              <input
                placeholder="Icon"
                value={link.icon}
                onChange={(e) => updateSocialLink(i, "icon", e.target.value)}
                className={inputClass + " w-24"}
              />
              <button
                type="button"
                onClick={() => removeSocialLink(i)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <SaveButton saving={saving} />
    </form>
  );
}

// ============================================================
// Section: Skills
// ============================================================
function SkillsSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Partial<SkillData> | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const categories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
    "Languages",
  ];

  const fetchSkills = useCallback(async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    if (data.success) setSkills(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    setSaving(true);
    try {
      const isEdit = editingSkill.id;
      const url = isEdit ? `/api/skills/${editingSkill.id}` : "/api/skills";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSkill),
      });
      const result = await res.json();
      if (result.success) {
        await fetchSkills();
        setShowForm(false);
        setEditingSkill(null);
        showToast(isEdit ? "Skill updated!" : "Skill created!", "success");
      }
    } catch {
      showToast("Failed to save skill", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSkills((prev) => prev.filter((s) => s.id !== id));
        showToast("Skill deleted", "success");
      }
    } catch {
      showToast("Failed to delete skill", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader title="Skills" />
        <button
          onClick={() => {
            setEditingSkill({ name: "", level: 80, category: "Frontend" });
            setShowForm(true);
          }}
          className={btnPrimary}
        >
          <Plus className="h-4 w-4" /> Add Skill
        </button>
      </div>

      {categories.map((cat) => {
        const catSkills = skills.filter((s) => s.category === cat);
        if (catSkills.length === 0) return null;
        return (
          <div key={cat} className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {cat}
            </h3>
            <div className="space-y-2">
              {catSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <span className="flex-1 font-medium text-neutral-900 dark:text-white">
                    {skill.name}
                  </span>
                  <div className="flex w-32 items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-violet-600"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-500 w-8">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingSkill(skill);
                        setShowForm(true);
                      }}
                      className="rounded-lg p-1.5 text-neutral-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="rounded-lg p-1.5 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {showForm && editingSkill && (
          <Modal
            onClose={() => {
              setShowForm(false);
              setEditingSkill(null);
            }}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {editingSkill.id ? "Edit Skill" : "Add Skill"}
              </h2>
              <FormField label="Name" required>
                <input
                  required
                  value={editingSkill.name || ""}
                  onChange={(e) =>
                    setEditingSkill({ ...editingSkill, name: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Category">
                <select
                  value={editingSkill.category || "Frontend"}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      category: e.target.value,
                    })
                  }
                  className={inputClass}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField label={`Level: ${editingSkill.level || 0}%`}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={editingSkill.level || 0}
                  onChange={(e) =>
                    setEditingSkill({
                      ...editingSkill,
                      level: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={btnPrimary + " flex-1"}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingSkill(null);
                  }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// Section: Projects
// ============================================================
function ProjectsSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] =
    useState<Partial<ProjectData> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.success) setProjects(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setSaving(true);
    try {
      const isEdit = editingProject.id;
      const url = isEdit
        ? `/api/projects/${editingProject.id}`
        : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...editingProject,
        techStack:
          typeof editingProject.techStack === "string"
            ? (editingProject.techStack as unknown as string)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editingProject.techStack,
        highlights:
          typeof editingProject.highlights === "string"
            ? (editingProject.highlights as unknown as string)
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editingProject.highlights,
        impact:
          typeof editingProject.impact === "string"
            ? (editingProject.impact as unknown as string)
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editingProject.impact,
        gallery:
          typeof editingProject.gallery === "string"
            ? (editingProject.gallery as unknown as string)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editingProject.gallery,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        await fetchProjects();
        setShowForm(false);
        setEditingProject(null);
        showToast(isEdit ? "Project updated!" : "Project created!", "success");
      }
    } catch {
      showToast("Failed to save project", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast("Project deleted", "success");
      }
    } catch {
      showToast("Failed to delete project", "error");
    }
  };

  const openNewForm = () => {
    setEditingProject({
      title: "",
      description: "",
      longDescription: "",
      image: "",
      techStack: [],
      category: "Fullstack",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      highlights: [],
      role: "",
      duration: "",
      impact: [],
      gallery: [],
    });
    setShowForm(true);
  };

  if (loading) return <LoadingSpinner />;

  const formProject = editingProject
    ? {
        ...editingProject,
        techStack: Array.isArray(editingProject.techStack)
          ? editingProject.techStack.join(", ")
          : editingProject.techStack || "",
        highlights: Array.isArray(editingProject.highlights)
          ? editingProject.highlights.join("\n")
          : editingProject.highlights || "",
        impact: Array.isArray(editingProject.impact)
          ? editingProject.impact.join("\n")
          : editingProject.impact || "",
        gallery: Array.isArray(editingProject.gallery)
          ? editingProject.gallery.join(", ")
          : editingProject.gallery || "",
      }
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader title="Projects" />
        <button onClick={openNewForm} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState icon={FolderKanban} label="No projects yet" />
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    {project.title}
                  </p>
                  {project.featured && (
                    <span className="shrink-0 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-neutral-500 truncate">
                  {project.category} ·{" "}
                  {project.techStack.slice(0, 3).join(", ")}
                  {project.techStack.length > 3 &&
                    ` +${project.techStack.length - 3}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-neutral-400 hover:text-neutral-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <button
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  className="rounded-lg p-2 text-neutral-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && formProject && (
          <Modal
            onClose={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {editingProject?.id ? "Edit Project" : "Add Project"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Title" required>
                  <input
                    required
                    value={editingProject?.title || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Category">
                  <select
                    value={editingProject?.category || "Fullstack"}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {["Fullstack", "Frontend", "Backend", "AI/ML"].map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Role">
                  <input
                    value={editingProject?.role || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        role: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Duration">
                  <input
                    value={editingProject?.duration || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        duration: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <FormField label="Short Description" required>
                <textarea
                  required
                  rows={2}
                  value={editingProject?.description || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Detailed Description">
                <textarea
                  rows={4}
                  value={editingProject?.longDescription || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      longDescription: e.target.value,
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Image URL">
                <input
                  value={editingProject?.image || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      image: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Tech Stack (comma-separated)">
                <input
                  value={formProject.techStack}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB"
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="GitHub URL">
                  <input
                    value={editingProject?.githubUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        githubUrl: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Live URL">
                  <input
                    value={editingProject?.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        liveUrl: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <FormField label="Highlights (one per line)">
                <textarea
                  rows={3}
                  value={formProject.highlights}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      highlights: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Impact (one per line)">
                <textarea
                  rows={3}
                  value={formProject.impact}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      impact: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingProject?.featured || false}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      featured: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-neutral-300 text-blue-600"
                />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Featured Project
                </span>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={btnPrimary + " flex-1"}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingProject(null);
                  }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// Section: Experience
// ============================================================
function ExperienceSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [items, setItems] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<ExperienceData> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/experiences");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const isEdit = editing.id;
      const url = isEdit
        ? `/api/experiences/${editing.id}`
        : "/api/experiences";
      const method = isEdit ? "PUT" : "POST";
      const payload = {
        ...editing,
        achievements:
          typeof editing.achievements === "string"
            ? (editing.achievements as unknown as string)
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editing.achievements,
        techStack:
          typeof editing.techStack === "string"
            ? (editing.techStack as unknown as string)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editing.techStack,
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        await fetchItems();
        setShowForm(false);
        setEditing(null);
        showToast(
          isEdit ? "Experience updated!" : "Experience created!",
          "success",
        );
      }
    } catch {
      showToast("Failed to save experience", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        showToast("Experience deleted", "success");
      }
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  const formData = editing
    ? {
        ...editing,
        achievements: Array.isArray(editing.achievements)
          ? editing.achievements.join("\n")
          : editing.achievements || "",
        techStack: Array.isArray(editing.techStack)
          ? editing.techStack.join(", ")
          : editing.techStack || "",
      }
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader title="Experience" />
        <button
          onClick={() => {
            setEditing({
              company: "",
              role: "",
              duration: "",
              startDate: "",
              endDate: "",
              location: "",
              description: "",
              achievements: [],
              techStack: [],
              type: "full-time",
            });
            setShowForm(true);
          }}
          className={btnPrimary}
        >
          <Plus className="h-4 w-4" /> Add Experience
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Briefcase} label="No experience entries" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {item.role}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {item.company} · {item.location}
                  </p>
                  <p className="text-xs text-neutral-400">{item.duration}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && formData && (
          <Modal
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {editing?.id ? "Edit Experience" : "Add Experience"}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Company" required>
                  <input
                    required
                    value={editing?.company || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, company: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Role" required>
                  <input
                    required
                    value={editing?.role || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, role: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Start Date">
                  <input
                    value={editing?.startDate || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, startDate: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2025-01"
                  />
                </FormField>
                <FormField label="End Date">
                  <input
                    value={editing?.endDate || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, endDate: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Present"
                  />
                </FormField>
                <FormField label="Duration">
                  <input
                    value={editing?.duration || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, duration: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Location">
                  <input
                    value={editing?.location || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Type">
                  <select
                    value={editing?.type || "full-time"}
                    onChange={(e) =>
                      setEditing({ ...editing, type: e.target.value })
                    }
                    className={inputClass}
                  >
                    {[
                      "full-time",
                      "part-time",
                      "contract",
                      "freelance",
                      "internship",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
              <FormField label="Description">
                <textarea
                  rows={3}
                  value={editing?.description || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Achievements (one per line)">
                <textarea
                  rows={4}
                  value={formData.achievements}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      achievements: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Tech Stack (comma-separated)">
                <input
                  value={formData.techStack}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      techStack: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass}
                />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={btnPrimary + " flex-1"}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// Section: Education
// ============================================================
function EducationSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [items, setItems] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<EducationData> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/education");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const isEdit = editing.id;
      const url = isEdit ? `/api/education/${editing.id}` : "/api/education";
      const payload = {
        ...editing,
        achievements:
          typeof editing.achievements === "string"
            ? (editing.achievements as unknown as string)
                .split("\n")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editing.achievements,
        coursework:
          typeof editing.coursework === "string"
            ? (editing.coursework as unknown as string)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : editing.coursework,
      };
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        await fetchItems();
        setShowForm(false);
        setEditing(null);
        showToast(
          isEdit ? "Education updated!" : "Education added!",
          "success",
        );
      }
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    try {
      const res = await fetch(`/api/education/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        showToast("Deleted", "success");
      }
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  const formData = editing
    ? {
        ...editing,
        achievements: Array.isArray(editing.achievements)
          ? editing.achievements.join("\n")
          : editing.achievements || "",
        coursework: Array.isArray(editing.coursework)
          ? editing.coursework.join(", ")
          : editing.coursework || "",
      }
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader title="Education" />
        <button
          onClick={() => {
            setEditing({
              institution: "",
              degree: "",
              field: "",
              duration: "",
              startDate: "",
              endDate: "",
              gpa: "",
              achievements: [],
              coursework: [],
            });
            setShowForm(true);
          }}
          className={btnPrimary}
        >
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={GraduationCap} label="No education entries" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {item.degree} in {item.field}
                  </p>
                  <p className="text-sm text-neutral-500">{item.institution}</p>
                  <p className="text-xs text-neutral-400">
                    {item.duration} {item.gpa && `· GPA: ${item.gpa}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditing(item);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && formData && (
          <Modal
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {editing?.id ? "Edit Education" : "Add Education"}
              </h2>
              <FormField label="Institution" required>
                <input
                  required
                  value={editing?.institution || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, institution: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Degree" required>
                  <input
                    required
                    value={editing?.degree || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, degree: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Field" required>
                  <input
                    required
                    value={editing?.field || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, field: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Start Date">
                  <input
                    value={editing?.startDate || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, startDate: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2020-09"
                  />
                </FormField>
                <FormField label="End Date">
                  <input
                    value={editing?.endDate || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, endDate: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2024-06"
                  />
                </FormField>
                <FormField label="GPA">
                  <input
                    value={editing?.gpa || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, gpa: e.target.value })
                    }
                    className={inputClass}
                    placeholder="3.8/4.0"
                  />
                </FormField>
              </div>
              <FormField label="Duration">
                <input
                  value={editing?.duration || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, duration: e.target.value })
                  }
                  className={inputClass}
                  placeholder="2020 - 2024"
                />
              </FormField>
              <FormField label="Achievements (one per line)">
                <textarea
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      achievements: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass + " resize-none"}
                />
              </FormField>
              <FormField label="Coursework (comma-separated)">
                <input
                  value={formData.coursework}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      coursework: e.target.value as unknown as string[],
                    })
                  }
                  className={inputClass}
                />
              </FormField>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={btnPrimary + " flex-1"}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// Section: Certifications
// ============================================================
function CertificationsSection({
  showToast,
}: {
  showToast: (msg: string, type: "success" | "error") => void;
}) {
  const [items, setItems] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CertificationData> | null>(
    null,
  );
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/certifications");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const isEdit = editing.id;
      const url = isEdit
        ? `/api/certifications/${editing.id}`
        : "/api/certifications";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const result = await res.json();
      if (result.success) {
        await fetchItems();
        setShowForm(false);
        setEditing(null);
        showToast(
          isEdit ? "Certification updated!" : "Certification added!",
          "success",
        );
      }
    } catch {
      showToast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certification?")) return;
    try {
      const res = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        showToast("Deleted", "success");
      }
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <SectionHeader title="Certifications" />
        <button
          onClick={() => {
            setEditing({ name: "", issuer: "", date: "" });
            setShowForm(true);
          }}
          className={btnPrimary}
        >
          <Plus className="h-4 w-4" /> Add Certification
        </button>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Award} label="No certifications" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {item.issuer} · {item.date}
                  </p>
                  {item.credentialId && (
                    <p className="text-xs text-neutral-400">
                      ID: {item.credentialId}
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-neutral-400 hover:text-blue-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setEditing(item);
                      setShowForm(true);
                    }}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && editing && (
          <Modal
            onClose={() => {
              setShowForm(false);
              setEditing(null);
            }}
          >
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {editing.id ? "Edit Certification" : "Add Certification"}
              </h2>
              <FormField label="Name" required>
                <input
                  required
                  value={editing.name || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <FormField label="Issuer" required>
                <input
                  required
                  value={editing.issuer || ""}
                  onChange={(e) =>
                    setEditing({ ...editing, issuer: e.target.value })
                  }
                  className={inputClass}
                />
              </FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Date" required>
                  <input
                    required
                    value={editing.date || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, date: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2025-03"
                  />
                </FormField>
                <FormField label="Expiry Date">
                  <input
                    value={editing.expiryDate || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, expiryDate: e.target.value })
                    }
                    className={inputClass}
                    placeholder="2028-03"
                  />
                </FormField>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Credential ID">
                  <input
                    value={editing.credentialId || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, credentialId: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Credential URL">
                  <input
                    value={editing.credentialUrl || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, credentialUrl: e.target.value })
                    }
                    className={inputClass}
                  />
                </FormField>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={btnPrimary + " flex-1"}
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className={btnSecondary}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// Overview Section
// ============================================================
function OverviewSection({
  stats,
}: {
  stats: {
    projects: number;
    skills: number;
    experiences: number;
    certifications: number;
  };
}) {
  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-blue-600",
    },
    {
      label: "Skills",
      value: stats.skills,
      icon: Code2,
      color: "text-violet-600",
    },
    {
      label: "Experience",
      value: stats.experiences,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      label: "Certifications",
      value: stats.certifications,
      icon: Award,
      color: "text-amber-600",
    },
  ];

  return (
    <div>
      <SectionHeader title="Dashboard Overview" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <card.icon className={cn("h-5 w-5", card.color)} />
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {card.label}
              </p>
            </div>
            <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD
// ============================================================
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experiences: 0,
    certifications: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/experiences").then((r) => r.json()),
      fetch("/api/certifications").then((r) => r.json()),
    ]).then(([projects, skills, experiences, certifications]) => {
      setStats({
        projects: projects.data?.length || 0,
        skills: skills.data?.length || 0,
        experiences: experiences.data?.length || 0,
        certifications: certifications.data?.length || 0,
      });
    });
  }, []);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    [],
  );

  const sidebarItems: {
    id: Section;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "personal", label: "Personal Info", icon: User },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "certifications", label: "Certifications", icon: Award },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-6 dark:border-neutral-800">
          <LayoutDashboard className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold text-neutral-900 dark:text-white">
            Admin
          </span>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {activeSection === item.id && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200 p-4 dark:border-neutral-800">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-20 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-neutral-900 dark:text-white">
              Admin
            </span>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="rounded-lg p-2 text-neutral-400 hover:text-neutral-600"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded-lg p-2 text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto px-4 pb-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                activeSection === item.id
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                  : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="mx-auto max-w-5xl px-4 py-8 pt-28 lg:pt-8 sm:px-6 lg:px-8">
          {activeSection === "overview" && <OverviewSection stats={stats} />}
          {activeSection === "personal" && (
            <PersonalInfoSection showToast={showToast} />
          )}
          {activeSection === "skills" && (
            <SkillsSection showToast={showToast} />
          )}
          {activeSection === "projects" && (
            <ProjectsSection showToast={showToast} />
          )}
          {activeSection === "experience" && (
            <ExperienceSection showToast={showToast} />
          )}
          {activeSection === "education" && (
            <EducationSection showToast={showToast} />
          )}
          {activeSection === "certifications" && (
            <CertificationsSection showToast={showToast} />
          )}
        </div>
      </main>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
