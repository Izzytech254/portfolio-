import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const education = await prisma.education.update({
      where: { id },
      data: {
        institution: body.institution,
        degree: body.degree,
        field: body.field,
        duration: body.duration,
        startDate: body.startDate,
        endDate: body.endDate,
        gpa: body.gpa ?? undefined,
        achievements: body.achievements,
        coursework: body.coursework,
      },
    });

    return NextResponse.json({ success: true, data: education });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update education" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.education.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "Education entry deleted",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete education" },
      { status: 500 },
    );
  }
}
