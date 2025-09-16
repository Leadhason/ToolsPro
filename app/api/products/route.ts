
import { db } from '@/lib/db/client';
import { products, categories, brands } from '@/lib/db/schema';
import { NextRequest, NextResponse } from 'next/server';
import { eq, and, gte, lte, ilike, desc, asc } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const categorySlug = searchParams.get('categorySlug');
    const brand = searchParams.get('brand');
    const tags = searchParams.getAll('tags');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const searchQuery = searchParams.get('searchQuery');
    const sortBy = searchParams.get('sortBy');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    // Build the where conditions
    const conditions = [eq(products.isActive, true)];

    if (categorySlug && categorySlug !== 'all-products') {
      // Get category by slug first
      const category = await db.select().from(categories).where(eq(categories.slug, categorySlug)).limit(1);
      if (category.length === 0) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      conditions.push(eq(products.categoryId, category[0].id));
    }

    if (brand) {
      // Get brand by name first
      const brandData = await db.select().from(brands).where(eq(brands.name, brand)).limit(1);
      if (brandData.length > 0) {
        conditions.push(eq(products.brandId, brandData[0].id));
      }
    }

    if (minPrice) {
      conditions.push(gte(products.price, minPrice));
    }

    if (maxPrice) {
      conditions.push(lte(products.price, maxPrice));
    }

    if (searchQuery) {
      conditions.push(ilike(products.name, `%${searchQuery}%`));
    }

    // Build and execute the query
    let query = db.select().from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .leftJoin(brands, eq(products.brandId, brands.id))
      .where(and(...conditions));

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        query = query.orderBy(asc(products.price));
        break;
      case 'price-desc':
        query = query.orderBy(desc(products.price));
        break;
      case 'newest':
        query = query.orderBy(desc(products.createdAt));
        break;
      default:
        query = query.orderBy(desc(products.createdAt));
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);
    
    const result = await query;

    // Transform the result to match expected format
    const transformedResult = result.map(row => ({
      ...row.products,
      category: row.categories,
      brand: row.brands
    }));

    // Apply tags filter if provided (post-query filtering for simplicity)
    if (tags.length > 0) {
      const filteredResult = transformedResult.filter(product => 
        tags.some(tag => product.tags?.includes(tag))
      );
      return NextResponse.json(filteredResult);
    }

    console.log('Successfully fetched products. Number of products:', transformedResult?.length);
    
    return NextResponse.json(transformedResult);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};
