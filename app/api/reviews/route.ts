
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/reviews - Submit a product review
export const POST = async (req: NextRequest) => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { productId, rating, title, content } = await req.json();

  if (!productId || !rating || !content) {
    return NextResponse.json({ error: 'Product ID, rating, and content are required' }, { status: 400 });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
  }

  // Check if the user has already reviewed this product
  const { data: existingReview, error: checkError } = await supabase
    .from('reviews')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error checking existing review:', checkError);
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  if (existingReview) {
    return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 409 });
  }

  // Insert the new review
  const { data: newReview, error: insertError } = await supabase
    .from('reviews')
    .insert({
      product_id: productId,
      user_id: user.id,
      rating,
      title,
      content,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error submitting review:', insertError);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // TODO: Update product's review_count and average rating
  // This would require a database function or a separate API call

  return NextResponse.json(newReview, { status: 201 });
};

// GET /api/reviews - Fetch all reviews with optional filtering and pagination
export const GET = async (req: NextRequest) => {
  const supabase = createClient();
  const searchParams = req.nextUrl.searchParams;

  const productId = searchParams.get('productId');
  const minRating = searchParams.get('minRating');
  const sortBy = searchParams.get('sortBy'); // e.g., 'newest', 'highest-rating'
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  let query = supabase.from('reviews').select('*, users(id, email)'); // Join with users to get author info

  if (productId) {
    query = query.eq('product_id', productId);
  }

  if (minRating) {
    query = query.gte('rating', parseInt(minRating, 10));
  }

  // Sorting logic
  switch (sortBy) {
    case 'highest-rating':
      query = query.order('rating', { ascending: false }).order('created_at', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
