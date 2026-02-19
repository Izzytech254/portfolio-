import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import prisma from "@/lib/prisma";

async function getPortfolioData() {
  const [
    personalInfo,
    skills,
    projects,
    experiences,
    education,
    certifications,
  ] = await Promise.all([
    prisma.personalInfo.findFirst({
      include: { socialLinks: { orderBy: { order: "asc" } } },
    }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
  ]);

  return {
    personalInfo,
    skills,
    projects,
    experiences,
    education,
    certifications,
  };
}

export default async function Home() {
  const data = await getPortfolioData();

  // Serialize dates and build plain objects for client components
  const personalInfo = data.personalInfo
    ? JSON.parse(JSON.stringify(data.personalInfo))
    : null;
  const skills = JSON.parse(JSON.stringify(data.skills));
  const projects = JSON.parse(JSON.stringify(data.projects));
  const experiences = JSON.parse(JSON.stringify(data.experiences));
  const education = JSON.parse(JSON.stringify(data.education));
  const certifications = JSON.parse(JSON.stringify(data.certifications));

  return (
    <main>
      <Hero personalInfo={personalInfo} />
      <About personalInfo={personalInfo} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Education education={education} />
      <Certifications certifications={certifications} />
      <Contact personalInfo={personalInfo} />
    </main>
  );
}
