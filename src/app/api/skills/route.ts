import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all skills (public)
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: skills });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch skills" },
      { status: 500 },
    );
  }
}

// POST create skill (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.skill.aggregate({ _max: { order: true } });
    const skill = await prisma.skill.create({
      data: {
        name: body.name,
        level: body.level,
        category: body.category,
        icon: body.icon || null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });
    return NextResponse.json({ success: true, data: skill }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create skill" },
      { status: 500 },
    );
  }
}
