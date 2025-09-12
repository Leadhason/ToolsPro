
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/orders/[id] - Fetch details for a specific order belonging to the authenticated user
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, order_items(*, products(*))') // Fetch order with its items and product details
    .eq('id', id)
    .eq('user_id', user.id) // Ensure the order belongs to the user
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
  }

  return NextResponse.json(order);
};
