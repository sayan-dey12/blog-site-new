// app/api/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies(); // ✅ FIX
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false });
    }

    jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ loggedIn: true });
  } catch {
    return NextResponse.json({ loggedIn: false });
  }
}