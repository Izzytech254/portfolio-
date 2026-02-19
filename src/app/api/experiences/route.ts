import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all experiences (public)
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: experiences });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

// POST create experience (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.experience.aggregate({
      _max: { order: true },
    });

    const experience = await prisma.experience.create({
      data: {
        company: body.company,
        role: body.role,
        duration: body.duration,
        startDate: body.startDate,
        endDate: body.endDate,
        location: body.location,
        description: body.description || "",
        achievements: body.achievements || [],
        techStack: body.techStack || [],
        type: body.type || "full-time",
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create experience" },
      { status: 500 },
    );
  }
}
