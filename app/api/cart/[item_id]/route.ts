
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// PUT /api/cart/[item_id] - Update the quantity of a specific item in the user's cart
export const PUT = async (req: NextRequest, { params }: { params: { item_id: string } }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { item_id } = params;
  const { quantity } = await req.json();

  if (!item_id || quantity === undefined) {
    return NextResponse.json({ error: 'Item ID and quantity are required' }, { status: 400 });
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    return NextResponse.json({ error: 'Quantity must be a positive number' }, { status: 400 });
  }

  // Verify the cart item belongs to the authenticated user's cart
  const { data: cartItem, error: cartItemError } = await supabase
    .from('cart_items')
    .select('id, carts!inner(user_id)')
    .eq('id', item_id)
    .single();

  if (cartItemError || !cartItem) {
    console.error('Error fetching cart item or item not found:', cartItemError);
    return NextResponse.json({ error: 'Cart item not found or unauthorized' }, { status: 404 });
  }

  if (!cartItem.carts || cartItem.carts.length === 0 || cartItem.carts[0].user_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized: Cart item does not belong to user' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity: quantity })
    .eq('id', item_id)
    .select()
    .single();

  if (error) {
    console.error('Error updating cart item quantity:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

// DELETE /api/cart/[item_id] - Remove a specific item from the user's cart
export const DELETE = async (req: NextRequest, { params }: { params: { item_id: string } }) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { item_id } = params;

  if (!item_id) {
    return NextResponse.json({ error: 'Item ID is required' }, { status: 400 });
  }

  // Verify the cart item belongs to the authenticated user's cart
  const { data: cartItem, error: cartItemError } = await supabase
    .from('cart_items')
    .select('id, carts!inner(user_id)')
    .eq('id', item_id)
    .single();

  if (cartItemError || !cartItem) {
    console.error('Error fetching cart item or item not found:', cartItemError);
    return NextResponse.json({ error: 'Cart item not found or unauthorized' }, { status: 404 });
  }

  if (!cartItem.carts || cartItem.carts.length === 0 || cartItem.carts[0].user_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized: Cart item does not belong to user' }, { status: 403 });
  }

  const { error: deleteError } = await supabase.from('cart_items').delete().eq('id', item_id);

  if (deleteError) {
    console.error('Error deleting cart item:', deleteError);
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  if (deleteError) {
    console.error('Error deleting cart item:', deleteError);
    return NextResponse.json({ error: 'An error occurred while deleting the cart item' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Item deleted successfully' });
