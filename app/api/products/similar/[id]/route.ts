
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const supabase = await createClient();
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  // First, get the details of the current product to find its category and tags
  const { data: currentProduct, error: productError } = await supabase
    .from('products')
    .select('category_id, tags')
    .eq('id', id)
    .single();

  if (productError || !currentProduct) {
    console.error('Error fetching current product for similar products:', productError);
    return NextResponse.json({ error: 'Current product not found' }, { status: 404 });
  }

  let query = supabase.from('products').select('*');

  // Filter by category_id
  query = query.eq('category_id', currentProduct.category_id);

  // Optionally, filter by tags (if any)
  if (currentProduct.tags && currentProduct.tags.length > 0) {
    query = query.overlaps('tags', currentProduct.tags);
  }

  // Exclude the current product itself
  query = query.neq('id', id);

  // Limit to a reasonable number of similar products
  query = query.limit(4); // Adjust limit as needed

  const { data: similarProducts, error: similarError } = await query;

  if (similarError) {
    console.error('Error fetching similar products:', similarError);
    return NextResponse.json({ error: similarError.message }, { status: 500 });
  }

  return NextResponse.json(similarProducts);
};
