import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all certifications (public)
export async function GET() {
  try {
    const certifications = await prisma.certification.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, data: certifications });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch certifications" },
      { status: 500 },
    );
  }
}

// POST create certification (protected by middleware)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const maxOrder = await prisma.certification.aggregate({
      _max: { order: true },
    });

    const certification = await prisma.certification.create({
      data: {
        name: body.name,
        issuer: body.issuer,
        date: body.date,
        expiryDate: body.expiryDate || null,
        credentialId: body.credentialId || null,
        credentialUrl: body.credentialUrl || null,
        image: body.image || null,
        order: (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json(
      { success: true, data: certification },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to create certification" },
      { status: 500 },
    );
  }
}
