import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT update skill
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: body.name,
        level: body.level,
        category: body.category,
        icon: body.icon ?? undefined,
      },
    });
    return NextResponse.json({ success: true, data: skill });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update skill" },
      { status: 500 },
    );
  }
}

// DELETE skill
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Skill deleted" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete skill" },
      { status: 500 },
    );
  }
}
