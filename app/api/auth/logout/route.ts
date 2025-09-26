import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/auth/jwt';

export async function POST() {
  try {
    await clearAuthCookies();
    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}