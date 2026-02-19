import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all education entries (public)
export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: education });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch education" },
      { status: 500 },
    );
  }
}

// POST create education entry (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.education.aggregate({
      _max: { order: true },
    });

    const education = await prisma.education.create({
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        duration: body.duration,
        startDate: body.startDate,
        endDate: body.endDate,
        gpa: body.gpa || null,
        achievements: body.achievements || [],
        coursework: body.coursework || [],
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json(
      { success: true, data: education },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create education" },
      { status: 500 },
    );
  }
}
