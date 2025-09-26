import { NextRequest, NextResponse } from 'next/server';
import { signJWT, setAuthCookies } from '@/lib/auth/jwt';
import { db } from '@/lib/db/client';
import { customers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find customer by email
    const user = await db.select().from(customers).where(eq(customers.email, email)).limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const foundUser = user[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, foundUser.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT tokens
    const accessToken = await signJWT({
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name || undefined,
      role: foundUser.role || 'customer'
    }, '15m'); // 15 minutes expiration

    const refreshToken = await signJWT({
      id: foundUser.id,
      email: foundUser.email,
      name: foundUser.name || undefined,
      role: foundUser.role || 'customer'
    }, '7d'); // 7 days expiration

    // Set HTTP-only cookies
    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({
      message: 'Sign in successful',
      user: {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json({ error: 'Sign in failed' }, { status: 500 });
  }
}