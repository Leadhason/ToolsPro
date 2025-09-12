
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/payment/webhook - Handles payment confirmation notifications from payment gateways
export const POST = async (req: NextRequest) => {
  const supabase = await createClient();

  // TODO: Implement webhook verification (e.g., using a secret signature) for security.
  // This step is critical to prevent spoofed payment notifications.
  console.log('Received payment webhook. For production, verify signature!');

  try {
    const payload = await req.json();

    // In a real application, the structure of the payload will depend on the payment gateway.
    // We will assume a simplified payload for now that includes an orderId and paymentStatus.
    const { orderId, paymentStatus } = payload;

    if (!orderId || !paymentStatus) {
      return NextResponse.json({ error: 'Missing orderId or paymentStatus in webhook payload' }, { status: 400 });
    }

    // Fetch the order to ensure it exists and belongs to a known user (optional, but good practice)
    const { data: existingOrder, error: orderFetchError } = await supabase
      .from('orders')
      .select('id, user_id, status, payment_status')
      .eq('id', orderId)
      .single();

    if (orderFetchError || !existingOrder) {
      console.error('Webhook: Order not found or error fetching order:', orderFetchError);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update the order's payment status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ status: 'processing', payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) {
      console.error('Webhook: Error updating order status:', updateError);
      return NextResponse.json({ error: updateError?.message || 'Failed to update order status' }, { status: 500 });
    }

    // If payment is successful, trigger post-payment actions
    if (paymentStatus === 'paid' || paymentStatus === 'successful') {
      console.log(`Order ${orderId} successfully paid. Triggering post-payment actions...`);
      // TODO: Send order confirmation email to user (using a transactional email service like Resend or SendGrid)
      // TODO: Any other post-payment processing (e.g., inventory management beyond initial stock reduction, fulfillment system integration)
    }

    return NextResponse.json({ message: 'Webhook processed successfully', order: updatedOrder });

  } catch (error) {
    console.error('Error processing payment webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
};
