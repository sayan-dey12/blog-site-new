import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
  role: "USER" | "ADMIN";
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔓 Public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup")
  ) {
    return NextResponse.next();
  }

  // 🔒 Protected routes
  const isProtected =
    pathname.startsWith("/blog/submit") ||
    pathname.startsWith("/api/blog") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/admin");

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return block(req);
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // 🔐 Admin-only routes
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/api/admin")
    ) {
      if (decoded.role !== "ADMIN") {
        return NextResponse.json(
          { message: "Forbidden" },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  } catch {
    return block(req);
  }
}

function block(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // API → JSON error
  if (pathname.startsWith("/api")) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Page → redirect to login
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/blog/submit",
    "/dashboard",
    "dashboard/:path",
    "/api/blog/:path*",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
