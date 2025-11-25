import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { sendEmail } from "@/helpers/sendEmail";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser.id,
    });

    return NextResponse.json(
      { message: "Signup successful! Check your email to verify your account." },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
