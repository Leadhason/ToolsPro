
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// DELETE /api/wishlist/[product_id] - Remove a product from the user's wishlist
export const DELETE = async (req: NextRequest, { params }: { params: { product_id: string } }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { product_id } = params;

  if (!product_id) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  // Verify the wishlist item belongs to the authenticated user
  const { data: wishlistItem, error: wishlistItemError } = await supabase
    .from('wishlist_items')
    .select('id, wishlists!inner(user_id)')
    .eq('user_id', user.id)
    .eq('product_id', product_id)
    .single();

  if (wishlistItemError || !wishlistItem || !wishlistItem.wishlists || wishlistItem.wishlists.length === 0 || wishlistItem.wishlists[0].user_id !== user.id) {
    console.error('Error fetching wishlist item or item not found:', wishlistItemError);
    return NextResponse.json({ error: 'Wishlist item not found or unauthorized' }, { status: 404 });
  }

  const { error } = await supabase
    .from('wishlist_items')
    .delete()
    .eq('id', wishlistItem.id)
    .eq('product_id', product_id);

  if (error) {
    console.error('Error deleting wishlist item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Product removed from wishlist successfully' });
};
