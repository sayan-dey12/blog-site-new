import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import { db } from '@/lib/db';
import { sendEmail } from '@/helpers/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const { username, name, email, password } = await req.json();

    // --------------------
    // Basic validation
    // --------------------
    if (!username || !name || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // --------------------
    // Username rules
    // --------------------
    if (/\s/.test(username)) {
      return NextResponse.json(
        { message: 'Username must not contain spaces' },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      return NextResponse.json(
        {
          message:
            'Username can only contain lowercase letters, numbers, and underscores',
        },
        { status: 400 }
      );
    }

    // --------------------
    // Check uniqueness
    // --------------------
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email or username already exists' },
        { status: 409 }
      );
    }

    // --------------------
    // Create user
    // --------------------
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username, // URL-safe
        name,     // display name (spaces allowed)
        email,
        password: hashedPassword,
      },
    });

    // --------------------
    // Send verification email
    // --------------------
    await sendEmail({
      email,
      emailType: 'VERIFY',
      userId: newUser.id,
    });

    return NextResponse.json(
      {
        message:
          'Signup successful! Check your email to verify your account.',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Signup error:', err);

    return NextResponse.json(
      { message: 'Something went wrong on the server.' },
      { status: 500 }
    );
  }
}
