import { NextRequest, NextResponse } from 'next/server';
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

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check if customer already exists
    const existingUser = await db.select().from(customers).where(eq(customers.email, email)).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Customer with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create customer
    const newUser = await db.insert(customers).values({
      email,
      passwordHash: hashedPassword,
      role: 'customer',
    }).returning({
      id: customers.id,
      email: customers.email,
      name: customers.name,
      role: customers.role
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        name: newUser[0].name,
        role: newUser[0].role
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Sign up error:', error);
    return NextResponse.json({ error: 'Sign up failed' }, { status: 500 });
  }
}