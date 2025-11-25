import { NextResponse } from "next/server";

export function GET() {
  const response = NextResponse.json({ message: "Logout successful" });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}