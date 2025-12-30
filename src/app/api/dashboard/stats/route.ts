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

    // 🔐 Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const userId = decoded.id;

    // ✅ Aggregate stats
    const [blogsCount, viewsSum, likesCount, commentsCount] =
      await Promise.all([
        db.blog.count({
          where: { authorId: userId },
        }),

        db.blog.aggregate({
          where: { authorId: userId },
          _sum: { views: true },
        }),

        db.like.count({
          where: { userId },
        }),

        db.comment.count({
          where: { userId },
        }),
      ]);

    return NextResponse.json({
      blogs: blogsCount,
      views: viewsSum._sum.views ?? 0,
      likes: likesCount,
      comments: commentsCount,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
