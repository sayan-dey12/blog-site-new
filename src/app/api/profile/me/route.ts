import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

type JwtPayload = { id: string };

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const profile = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        name: true,
        username: true,
        bio: true,
        about: true,
        image: true,
      },
    });

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
