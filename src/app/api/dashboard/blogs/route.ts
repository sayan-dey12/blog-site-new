import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

type JwtPayload = {
  id: string;
};

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

    const blogs = await db.blog.findMany({
      where: {
        authorId: decoded.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}
