import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { token, id, password } = await req.json();

  const hashed = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.user.findFirst({
    where: {
      id,
      forgotToken: hashed,
      forgotTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await db.user.update({
    where: { id },
    data: {
      password: hashedPassword,
      forgotToken: null,
      forgotTokenExpiry: null,
    },
  });

  return NextResponse.json({ message: "Password reset successful" });
}