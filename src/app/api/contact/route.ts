import { NextRequest, NextResponse } from "next/server";

// POST - Handle contact form submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // In production, you would:
    // 1. Send email via SendGrid, Resend, or Nodemailer
    // 2. Save to database
    // 3. Send notification to Slack/Discord
    // For now, we log and return success
    console.log("Contact form submission:", { name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 },
    );
  }
}
