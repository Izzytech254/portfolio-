import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const certification = await prisma.certification.update({
      where: { id },
      data: {
        name: body.name,
        issuer: body.issuer,
        date: body.date,
        expiryDate: body.expiryDate ?? undefined,
        credentialId: body.credentialId ?? undefined,
        credentialUrl: body.credentialUrl ?? undefined,
        image: body.image ?? undefined,
      },
    });

    return NextResponse.json({ success: true, data: certification });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update certification" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await prisma.certification.delete({ where: { id } });
    return NextResponse.json({
      success: true,
      message: "Certification deleted",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete certification" },
      { status: 500 },
    );
  }
}
