import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const experience = await prisma.experience.update({
      where: { id },
      data: {
        company: body.company,
        role: body.role,
        duration: body.duration,
        startDate: body.startDate,
        endDate: body.endDate,
        location: body.location,
        description: body.description,
        achievements: body.achievements,
        techStack: body.techStack,
        type: body.type,
      },
    });

    return NextResponse.json({ success: true, data: experience });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update experience" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}
