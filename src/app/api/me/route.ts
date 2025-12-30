// app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import {db} from "@/lib/db";

type JwtPayload = {
  id: string;
  email: string;
  username: string | null;
  name: string | null;
  role: "USER" | "ADMIN";
};

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ FIX
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false , user: null});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await db.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) {
      return NextResponse.json(
        { loggedIn: false, user: null },
        { status: 401 }
      );
    }
    return NextResponse.json({
      loggedIn: true,
      user,
    });
  } catch {
    return NextResponse.json({ loggedIn: false , user: null });
  }
}