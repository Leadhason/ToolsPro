
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('categories').select('*').order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optional: Build a hierarchical structure if needed by the frontend
  // For simplicity, returning a flat list for now.

  return NextResponse.json(data);
};
