import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { message: "Email not found" },
      { status: 400 }
    );
  }

  await sendEmail({
    email,
    emailType: "RESET",
    userId: user.id,
  });

  return NextResponse.json({ message: "Reset link sent" });
}