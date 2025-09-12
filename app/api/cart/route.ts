
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/cart - Fetch the authenticated user's active cart and its items
export const GET = async (req: NextRequest) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (cartError || !cart) {
    console.error('Error fetching cart:', cartError);
    return NextResponse.json({ error: 'Cart not found or error fetching cart' }, { status: 404 });
  }

  const { data: cartItems, error: itemsError } = await supabase
    .from('cart_items')
    .select('*, products(*)') // Join with products table
    .eq('cart_id', cart.id);

  if (itemsError) {
    console.error('Error fetching cart items:', itemsError);
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ cartId: cart.id, items: cartItems });
};

// POST /api/cart - Add a product to the user's cart (or create a new cart if none exists)
export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, quantity = 1 } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  let { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (cartError && cartError.code === 'PGRST116') { // No rows found (cart does not exist)
    // Create a new cart for the user
    const { data: newCart, error: newCartError } = await supabase
      .from('carts')
      .insert({ user_id: user.id })
      .select()
      .single();

    if (newCartError || !newCart) {
      console.error('Error creating new cart:', newCartError);
      return NextResponse.json({ error: newCartError?.message || 'Failed to create new cart' }, { status: 500 });
    }
    cart = newCart;
  } else if (cartError) {
    console.error('Error fetching cart:', cartError);
    return NextResponse.json({ error: cartError?.message || 'Failed to fetch cart' }, { status: 500 });
  }

  // Check if the product already exists in the cart
  const { data: existingItem, error: existingItemError } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('cart_id', cart?.id)
    .eq('product_id', productId)
    .single();

  if (existingItemError && existingItemError.code !== 'PGRST116') {
    console.error('Error checking existing cart item:', existingItemError);
    return NextResponse.json({ error: existingItemError?.message || 'Failed to check existing cart item' }, { status: 500 });
  }

  if (existingItem) {
    // Update quantity if item already exists
    const newQuantity = existingItem.quantity + quantity;
    const { data: updatedItem, error: updateError } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating cart item quantity:', updateError);
      return NextResponse.json({ error: updateError?.message || 'Failed to update cart item quantity' }, { status: 500 });
    }
    return NextResponse.json(updatedItem);
  } else {
    // Add new item to cart
    const { data: newItem, error: insertError } = await supabase
      .from('cart_items')
      .insert({ cart_id: cart?.id, product_id: productId, quantity })
      .select()
      .single();

    if (insertError) {
      console.error('Error adding new cart item:', insertError);
      return NextResponse.json({ error: insertError?.message || 'Failed to add new cart item' }, { status: 500 });
    }
    return NextResponse.json(newItem);
  }
};
