
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();

  // Fetch all unique brands from the products table
  const { data, error } = await supabase.from('products').select('brand');

  if (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Extract unique brand names into a simple array of strings
  const uniqueBrands = [...new Set(data.map((item: any) => item.brand).filter(Boolean))];

  return NextResponse.json(uniqueBrands);
};
