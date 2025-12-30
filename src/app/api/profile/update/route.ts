import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

type JwtPayload = {
  id: string;
};

export async function PUT(req: Request) {
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

    const body = await req.json();
    const { name, username, bio, about, image } = body;

    const updatedUser = await db.user.update({
      where: { id: decoded.id },
      data: {
        name,
        username,
        bio,
        about,
        image,
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        about: true,
        image: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
