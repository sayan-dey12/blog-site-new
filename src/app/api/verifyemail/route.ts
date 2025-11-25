import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const userId = req.nextUrl.searchParams.get("id");

  if (!token || !userId) {
    return NextResponse.json(
      { message: "Invalid link" },
      { status: 400 }
    );
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.user.findFirst({
    where: {
      id: userId,
      verifyToken: hashedToken,
      verifyTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verifyToken: null,
      verifyTokenExpiry: null,
    },
  });

  return NextResponse.json({
    message: "Email verified successfully",
  });
}