import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ============================================================
  // 1. Create Admin User
  // ============================================================
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme123";
  const passwordHash = await hash(password, 12);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });
  console.log(`✅ Admin user created: ${username}`);

  // ============================================================
  // 2. Personal Info
  // ============================================================
  // Delete existing
  await prisma.socialLink.deleteMany();
  await prisma.personalInfo.deleteMany();

  const personalInfo = await prisma.personalInfo.create({
    data: {
      name: "Israel Nicodemus",
      title: "Fullstack Developer",
      tagline: "Building digital experiences that make an impact.",
      email: "israelnicodemus@gmail.com",
      phone: "0727339430 / 0111204557",
      location: "Nairobi, Kenya",
      bio: `I'm a passionate fullstack developer with a deep love for crafting high-performance web applications. With expertise spanning React, Node.js, and modern cloud infrastructure, I transform complex problems into elegant, scalable solutions. I thrive in fast-paced environments where innovation meets execution, and I bring a relentless focus on code quality, user experience, and measurable business impact to every project I undertake.`,
      avatar: "/profile.jpg",
      resumeUrl: "/resume.pdf",
      socialLinks: {
        create: [
          {
            platform: "GitHub",
            url: "https://github.com/Izzytech254",
            icon: "github",
            order: 0,
          },
          {
            platform: "Instagram",
            url: "https://instagram.com/izzytech254",
            icon: "instagram",
            order: 1,
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/izzy_254",
            icon: "twitter",
            order: 2,
          },
          {
            platform: "Email",
            url: "mailto:israelnicodemus@gmail.com",
            icon: "mail",
            order: 3,
          },
        ],
      },
    },
  });
  console.log("✅ Personal info seeded");

  // ============================================================
  // 3. Skills
  // ============================================================
  await prisma.skill.deleteMany();

  const skillsData = [
    // Frontend
    { name: "React", level: 95, category: "Frontend", order: 0 },
    { name: "Next.js", level: 90, category: "Frontend", order: 1 },
    { name: "TypeScript", level: 90, category: "Frontend", order: 2 },
    { name: "Tailwind CSS", level: 92, category: "Frontend", order: 3 },
    { name: "HTML5", level: 98, category: "Frontend", order: 4 },
    { name: "CSS3", level: 95, category: "Frontend", order: 5 },
    { name: "Framer Motion", level: 85, category: "Frontend", order: 6 },
    // Backend
    { name: "Node.js", level: 92, category: "Backend", order: 7 },
    { name: "Express.js", level: 90, category: "Backend", order: 8 },
    { name: "REST APIs", level: 93, category: "Backend", order: 9 },
    { name: "GraphQL", level: 80, category: "Backend", order: 10 },
    { name: "Socket.io", level: 78, category: "Backend", order: 11 },
    // Database
    { name: "MongoDB", level: 88, category: "Database", order: 12 },
    { name: "PostgreSQL", level: 85, category: "Database", order: 13 },
    { name: "Redis", level: 75, category: "Database", order: 14 },
    { name: "Prisma", level: 82, category: "Database", order: 15 },
    // DevOps
    { name: "Docker", level: 80, category: "DevOps", order: 16 },
    { name: "AWS", level: 75, category: "DevOps", order: 17 },
    { name: "Vercel", level: 90, category: "DevOps", order: 18 },
    { name: "CI/CD", level: 82, category: "DevOps", order: 19 },
    { name: "Nginx", level: 70, category: "DevOps", order: 20 },
    // Tools
    { name: "Git", level: 92, category: "Tools", order: 21 },
    { name: "VS Code", level: 95, category: "Tools", order: 22 },
    { name: "Figma", level: 70, category: "Tools", order: 23 },
    { name: "Postman", level: 88, category: "Tools", order: 24 },
    { name: "Linux", level: 80, category: "Tools", order: 25 },
    // Languages
    { name: "JavaScript", level: 95, category: "Languages", order: 26 },
    { name: "TypeScript", level: 90, category: "Languages", order: 27 },
    { name: "Python", level: 75, category: "Languages", order: 28 },
    { name: "SQL", level: 82, category: "Languages", order: 29 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ ${skillsData.length} skills seeded`);

  // ============================================================
  // 4. Projects
  // ============================================================
  await prisma.project.deleteMany();

  const projectsData = [
    {
      title: "E-Commerce Platform",
      slug: "ecommerce-platform",
      description:
        "A full-featured e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
      longDescription:
        "Built from the ground up, this enterprise-grade e-commerce platform handles thousands of concurrent users with sub-200ms response times. Features include real-time inventory tracking, Stripe payment integration, comprehensive admin dashboard, and an AI-powered recommendation engine that increased average order value by 23%.",
      image: "/projects/ecommerce.jpg",
      gallery: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
      techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "Docker"],
      category: "Fullstack",
      githubUrl: "https://github.com/johndoe/ecommerce",
      liveUrl: "https://ecommerce-demo.johndoe.dev",
      featured: true,
      highlights: [
        "Handles 10,000+ concurrent users",
        "Sub-200ms API response times",
        "99.9% uptime SLA",
        "PCI DSS compliant payment processing",
      ],
      role: "Lead Developer",
      duration: "4 months",
      impact: [
        "Increased conversion rate by 35%",
        "Reduced page load time by 60%",
        "Generated $2M+ in transactions",
      ],
      order: 0,
    },
    {
      title: "Project Management SaaS",
      slug: "project-management-saas",
      description:
        "A collaborative project management tool with real-time updates, Kanban boards, and team analytics.",
      longDescription:
        "A Jira-alternative built for modern teams. Features real-time collaborative editing, drag-and-drop Kanban boards, sprint planning, time tracking, and comprehensive analytics dashboards. Built with a microservices architecture to ensure scalability.",
      image: "/projects/pm-saas.jpg",
      gallery: ["/projects/pm-saas-1.jpg", "/projects/pm-saas-2.jpg"],
      techStack: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "Socket.io",
        "AWS",
      ],
      category: "Fullstack",
      githubUrl: "https://github.com/johndoe/pm-saas",
      liveUrl: "https://pm-demo.johndoe.dev",
      featured: true,
      highlights: [
        "Real-time collaboration for 50+ users",
        "Drag-and-drop Kanban boards",
        "Automated sprint analytics",
        "Role-based access control",
      ],
      role: "Fullstack Developer",
      duration: "6 months",
      impact: [
        "Adopted by 500+ beta users",
        "40% improvement in team productivity",
        "Reduced project delivery time by 25%",
      ],
      order: 1,
    },
    {
      title: "AI Content Generator",
      slug: "ai-content-generator",
      description:
        "An AI-powered content generation platform with SEO optimization and multi-language support.",
      longDescription:
        "Leveraging OpenAI's GPT APIs, this platform generates SEO-optimized content for blogs, social media, and marketing campaigns. Features include tone customization, plagiarism checking, multi-language output, and a built-in content calendar.",
      image: "/projects/ai-content.jpg",
      gallery: [],
      techStack: ["React", "Node.js", "OpenAI API", "MongoDB", "Tailwind CSS"],
      category: "AI/ML",
      githubUrl: "https://github.com/johndoe/ai-content",
      liveUrl: "https://ai-content.johndoe.dev",
      featured: true,
      highlights: [
        "Generates 1,000+ words in <10 seconds",
        "95% SEO score on generated content",
        "Support for 12 languages",
        "Built-in plagiarism detection",
      ],
      role: "Solo Developer",
      duration: "3 months",
      impact: [
        "10,000+ articles generated",
        "85% user retention rate",
        "Featured on Product Hunt",
      ],
      order: 2,
    },
    {
      title: "Real-Time Chat Application",
      slug: "realtime-chat-app",
      description:
        "A scalable real-time chat application with end-to-end encryption, file sharing, and video calls.",
      longDescription:
        "Built with WebSocket technology for instant messaging with zero-lag communication. Features include end-to-end encryption, media sharing, group chats, voice/video calls via WebRTC, and message search with full-text indexing.",
      image: "/projects/chat-app.jpg",
      gallery: [],
      techStack: [
        "React",
        "Socket.io",
        "Node.js",
        "MongoDB",
        "WebRTC",
        "Redis",
      ],
      category: "Fullstack",
      githubUrl: "https://github.com/johndoe/chat-app",
      liveUrl: "https://chat.johndoe.dev",
      featured: false,
      highlights: [
        "<50ms message delivery",
        "End-to-end encryption",
        "WebRTC video calls",
        "Offline message queuing",
      ],
      role: "Lead Developer",
      duration: "3 months",
      impact: [
        "Supports 5,000 concurrent connections",
        "99.99% message delivery rate",
        "500+ active daily users",
      ],
      order: 3,
    },
    {
      title: "Portfolio Website Builder",
      slug: "portfolio-builder",
      description:
        "A drag-and-drop portfolio builder with custom themes, analytics, and one-click deployment.",
      longDescription:
        "An intuitive drag-and-drop website builder specifically designed for developers and designers. Users can create stunning portfolio websites in minutes with custom themes, responsive layouts, and built-in SEO optimization.",
      image: "/projects/portfolio-builder.jpg",
      gallery: [],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Prisma"],
      category: "Frontend",
      githubUrl: "https://github.com/johndoe/portfolio-builder",
      liveUrl: "https://builder.johndoe.dev",
      featured: false,
      highlights: [
        "20+ customizable templates",
        "Drag-and-drop editor",
        "One-click Vercel deployment",
        "Built-in analytics dashboard",
      ],
      role: "Solo Developer",
      duration: "2 months",
      impact: [
        "1,000+ portfolios created",
        "4.8/5 user satisfaction score",
        "Featured in dev.to weekly picks",
      ],
      order: 4,
    },
    {
      title: "REST API Boilerplate",
      slug: "rest-api-boilerplate",
      description:
        "A production-ready Node.js REST API boilerplate with authentication, rate limiting, and comprehensive docs.",
      longDescription:
        "An opinionated, production-ready boilerplate for building scalable REST APIs with Node.js. Includes JWT authentication, role-based authorization, rate limiting, request validation, comprehensive error handling, and auto-generated Swagger documentation.",
      image: "/projects/api-boilerplate.jpg",
      gallery: [],
      techStack: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "MongoDB",
        "JWT",
        "Swagger",
      ],
      category: "Backend",
      githubUrl: "https://github.com/johndoe/api-boilerplate",
      featured: false,
      highlights: [
        "JWT + refresh token auth",
        "Rate limiting & CORS",
        "Auto-generated Swagger docs",
        "100% TypeScript",
      ],
      role: "Solo Developer",
      duration: "1 month",
      impact: [
        "500+ GitHub stars",
        "Used in 50+ production apps",
        "Active open-source community",
      ],
      order: 5,
    },
  ];

  for (const project of projectsData) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ ${projectsData.length} projects seeded`);

  // ============================================================
  // 5. Experiences
  // ============================================================
  await prisma.experience.deleteMany();

  const experiencesData = [
    {
      company: "TechCorp Inc.",
      role: "Fullstack Developer",
      duration: "Jan 2025 - Present",
      startDate: "2025-01",
      endDate: "Present",
      location: "San Francisco, CA (Remote)",
      description:
        "Leading the development of customer-facing applications serving 100K+ users, driving performance optimization and architectural improvements.",
      achievements: [
        "Architected and shipped a React-based dashboard reducing data retrieval time by 45%",
        "Led migration from REST to GraphQL, cutting API payload sizes by 60%",
        "Mentored 3 junior developers, conducting weekly code reviews and pair programming",
        "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes",
        "Designed and built microservices handling 1M+ daily API requests",
      ],
      techStack: [
        "React",
        "Next.js",
        "Node.js",
        "GraphQL",
        "PostgreSQL",
        "Docker",
        "AWS",
      ],
      type: "full-time",
      order: 0,
    },
    {
      company: "Digital Agency Pro",
      role: "Frontend Developer",
      duration: "Jun 2024 - Dec 2024",
      startDate: "2024-06",
      endDate: "2024-12",
      location: "New York, NY (Hybrid)",
      description:
        "Delivered pixel-perfect, responsive web applications for high-profile clients across fintech, healthcare, and e-commerce sectors.",
      achievements: [
        "Built 15+ client websites with 98% on-time delivery rate",
        "Achieved 95+ Lighthouse scores across all projects",
        "Reduced client-reported bugs by 70% through comprehensive testing",
        "Introduced component library that cut development time by 40%",
      ],
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Framer Motion",
      ],
      type: "full-time",
      order: 1,
    },
    {
      company: "StartupXYZ",
      role: "Junior Developer (Intern)",
      duration: "Jan 2024 - May 2024",
      startDate: "2024-01",
      endDate: "2024-05",
      location: "Remote",
      description:
        "Contributed to a fast-growing SaaS startup, working on both frontend features and backend API development.",
      achievements: [
        "Developed 20+ REST API endpoints for the core product",
        "Built a real-time notification system serving 5,000+ users",
        "Wrote 200+ unit and integration tests achieving 85% code coverage",
        "Optimized database queries reducing average response time by 35%",
      ],
      techStack: ["JavaScript", "Node.js", "Express.js", "MongoDB", "React"],
      type: "internship",
      order: 2,
    },
  ];

  for (const exp of experiencesData) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ ${experiencesData.length} experiences seeded`);

  // ============================================================
  // 6. Education
  // ============================================================
  await prisma.education.deleteMany();

  await prisma.education.create({
    data: {
      institution: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      duration: "2020 - 2024",
      startDate: "2020-09",
      endDate: "2024-06",
      gpa: "3.8/4.0",
      achievements: [
        "Dean's List - All Semesters",
        "Best Capstone Project Award",
        "Computer Science Society President",
        "Hackathon Winner - 3x Regional Champion",
      ],
      coursework: [
        "Data Structures & Algorithms",
        "Web Development",
        "Database Systems",
        "Software Engineering",
        "Cloud Computing",
        "Machine Learning",
      ],
      order: 0,
    },
  });
  console.log("✅ Education seeded");

  // ============================================================
  // 7. Certifications
  // ============================================================
  await prisma.certification.deleteMany();

  const certsData = [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2025-03",
      expiryDate: "2028-03",
      credentialId: "AWS-DEV-2025-XXXXX",
      credentialUrl: "https://aws.amazon.com/verification",
      order: 0,
    },
    {
      name: "Meta Frontend Developer Professional",
      issuer: "Meta (Coursera)",
      date: "2024-11",
      credentialId: "META-FE-2024-XXXXX",
      credentialUrl: "https://coursera.org/verify",
      order: 1,
    },
    {
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2024-08",
      credentialId: "MDB-DEV-2024-XXXXX",
      credentialUrl: "https://university.mongodb.com/verify",
      order: 2,
    },
    {
      name: "Node.js Application Developer",
      issuer: "OpenJS Foundation",
      date: "2025-01",
      credentialId: "OPENJS-NODE-2025-XXXXX",
      credentialUrl: "https://openjsf.org/verify",
      order: 3,
    },
  ];

  for (const cert of certsData) {
    await prisma.certification.create({ data: cert });
  }
  console.log(`✅ ${certsData.length} certifications seeded`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
