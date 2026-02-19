import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET personal info (public)
export async function GET() {
  try {
    const info = await prisma.personalInfo.findFirst({
      include: { socialLinks: { orderBy: { order: "asc" } } },
    });

    if (!info) {
      return NextResponse.json(
        { success: false, error: "Personal info not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: info });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch personal info" },
      { status: 500 },
    );
  }
}

// PUT update personal info (protected by middleware)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { socialLinks, ...personalData } = body;

    // Find existing
    const existing = await prisma.personalInfo.findFirst();
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Personal info not found" },
        { status: 404 },
      );
    }

    // Update personal info
    const updated = await prisma.personalInfo.update({
      where: { id: existing.id },
      data: {
        ...personalData,
        updatedAt: new Date(),
        ...(socialLinks && {
          socialLinks: {
            deleteMany: {},
            create: socialLinks.map(
              (
                link: { platform: string; url: string; icon: string },
                i: number,
              ) => ({
                platform: link.platform,
                url: link.url,
                icon: link.icon,
                order: i,
              }),
            ),
          },
        }),
      },
      include: { socialLinks: { orderBy: { order: "asc" } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update personal info error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update personal info" },
      { status: 500 },
    );
  }
}
