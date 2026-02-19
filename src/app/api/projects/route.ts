import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all projects (public)
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: projects });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST create project (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.project.aggregate({ _max: { order: true } });
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug,
        description: body.description,
        longDescription: body.longDescription || "",
        image: body.image || "",
        gallery: body.gallery || [],
        techStack: body.techStack || [],
        category: body.category || "Fullstack",
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        featured: body.featured || false,
        highlights: body.highlights || [],
        role: body.role || "",
        duration: body.duration || "",
        impact: body.impact || [],
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 },
    );
  }
}
