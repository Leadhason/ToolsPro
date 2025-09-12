
import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const supabase = await createClient();
  const searchParams = req.nextUrl.searchParams;

  const categorySlug = searchParams.get('categorySlug');
  const brand = searchParams.get('brand');
  const tags = searchParams.getAll('tags');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const searchQuery = searchParams.get('searchQuery');
  const sortBy = searchParams.get('sortBy');
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  let query = supabase.from('products').select('*');

  if (categorySlug && categorySlug !== 'all-products') {
    // Assuming you have a way to get category ID from slug, e.g., another query
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (categoryError || !categoryData) {
      console.error('Error fetching category:', categoryError);
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    query = query.eq('category_id', categoryData.id);
  }

  if (brand) {
    query = query.eq('brand', brand);
  }

  if (tags.length > 0) {
    query = query.contains('tags', tags);
  }

  if (minPrice) {
    query = query.gte('price', parseFloat(minPrice));
  }

  if (maxPrice) {
    query = query.lte('price', parseFloat(maxPrice));
  }

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }

  // Sorting logic
  switch (sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'rating-desc':
      query = query.order('rating', { ascending: false }).order('review_count', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false }); // Default sort
  }

  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    console.error('Supabase query error details:', error.details);
    console.error('Supabase query error hint:', error.hint);
    console.error('Supabase query error code:', error.code);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('Successfully fetched products. Number of products:', data?.length);
  // Optionally log a sample of the data if it's not too large
  // console.log('Sample product data:', data ? data.slice(0, 2) : 'No data');

  return NextResponse.json(data);
};
