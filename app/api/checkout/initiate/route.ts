
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'; // For generating order_number

// POST /api/checkout/initiate - Initiate checkout process
export const POST = async (req: NextRequest) => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { shippingAddress, paymentMethod } = await req.json();

  if (!shippingAddress || !paymentMethod) {
    return NextResponse.json({ error: 'Shipping address and payment method are required' }, { status: 400 });
  }

  // 1. Fetch user's cart items
  const { data: cart, error: cartError } = await supabase
    .from('carts')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (cartError || !cart) {
    console.error('Error fetching cart for checkout:', cartError);
    return NextResponse.json({ error: 'Cart not found or empty' }, { status: 404 });
  }

  const { data: cartItems, error: itemsError } = await supabase
    .from('cart_items')
    .select('*, products(id, name, price, stock_quantity)')
    .eq('cart_id', cart.id);

  if (itemsError || !cartItems || cartItems.length === 0) {
    console.error('Error fetching cart items for checkout:', itemsError);
    return NextResponse.json({ error: 'Cart is empty or error fetching items' }, { status: 404 });
  }

  // 2. Validate product stock and calculate total amount
  let totalAmount = 0;
  for (const item of cartItems) {
    const product = item.products as { id: string, name: string, price: number, stock_quantity: number };
    if (item.quantity > product.stock_quantity) {
      return NextResponse.json({ error: `Not enough stock for ${product.name}. Available: ${product.stock_quantity}` }, { status: 400 });
    }
    totalAmount += product.price * item.quantity;
  }

  // 3. Create a new order entry
  const orderNumber = `ORD-${uuidv4().split('-')[0].toUpperCase()}`;
  const { data: newOrder, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      order_number: orderNumber,
      total_amount: totalAmount,
      status: 'pending',
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      payment_status: 'pending',
    })
    .select()
    .single();

  if (orderError || !newOrder) {
    console.error('Error creating new order:', orderError);
    return NextResponse.json({ error: orderError?.message || 'Failed to create new order' }, { status: 500 });
  }

  // 4. Move cart items to order_items and reduce stock
  const orderItemsToInsert = cartItems.map((item: any) => ({
    order_id: newOrder.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: (item.products as { id: string, name: string, price: number }).price,
  }));

  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItemsToInsert);

  if (orderItemsError) {
    console.error('Error inserting order items:', orderItemsError);
    // Consider rolling back the order creation here if necessary
    return NextResponse.json({ error: orderItemsError?.message || 'Failed to insert order items' }, { status: 500 });
  }

  // Reduce product stock quantities
  for (const item of cartItems as any) {
    const product = item.products as { id: string, name: string, price: number, stock_quantity: number };
    const newStock = product.stock_quantity - item.quantity;
    const { error: updateStockError } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', product.id);

    if (updateStockError) {
      console.error('Error updating product stock:', updateStockError);
      // This is a critical error, consider complex rollback or manual intervention
    }
  }

  // 5. Clear the user's cart
  const { error: clearCartError } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (clearCartError) {
    console.error('Error clearing cart items after checkout:', clearCartError);
    // Log this, but don't fail the entire checkout as the order is already placed
  }

  // TODO: Integrate with external payment gateway here (e.g., generate a payment URL)
  // For now, assume payment initiation is successful and return order details.

  return NextResponse.json({ message: 'Checkout initiated successfully', order: newOrder });
};
