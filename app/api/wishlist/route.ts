
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/wishlist - Fetch the authenticated user's wishlist items
export const GET = async (req: NextRequest) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: wishlistItems, error } = await supabase
    .from('wishlist_items')
    .select('*, products(*)') // Join with products table
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching wishlist items:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch wishlist items' }, { status: 500 });
  }

  return NextResponse.json(wishlistItems);
};

// POST /api/wishlist - Add a product to the user's wishlist
export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  // Check if the product is already in the wishlist
  const { data: existingItem, error: checkError } = await supabase
    .from('wishlist_items')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error checking existing wishlist item:', checkError);
    return NextResponse.json({ error: checkError?.message || 'Failed to check existing wishlist item' }, { status: 500 });
  }

  if (existingItem) {
    return NextResponse.json({ message: 'Product already in wishlist' }, { status: 200 });
  }

  const { data: newItem, error: insertError } = await supabase
    .from('wishlist_items')
    .insert({ user_id: user.id, product_id: productId })
    .select()
    .single();

  if (insertError) {
    console.error('Error adding item to wishlist:', insertError);
    return NextResponse.json({ error: insertError?.message || 'Failed to add item to wishlist' }, { status: 500 });
  }

  return NextResponse.json(newItem, { status: 201 });
};
