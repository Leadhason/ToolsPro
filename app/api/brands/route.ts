
import { db } from '@/lib/db/client';
import { brands } from '@/lib/db/schema';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const result = await db.select().from(brands);
    
    console.log('Successfully fetched brands. Number of brands:', result?.length);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 });
  }
};
