const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

async function resetAndSeed() {
  try {
    console.log('🗑️  Dropping existing tables...');
    
    // Drop tables in correct order to avoid FK constraint issues
    await sql`DROP TABLE IF EXISTS refresh_tokens CASCADE;`;
    await sql`DROP TABLE IF EXISTS wishlist CASCADE;`;
    await sql`DROP TABLE IF EXISTS reviews CASCADE;`;
    await sql`DROP TABLE IF EXISTS order_items CASCADE;`;
    await sql`DROP TABLE IF EXISTS orders CASCADE;`;
    await sql`DROP TABLE IF EXISTS cart_items CASCADE;`;
    await sql`DROP TABLE IF EXISTS carts CASCADE;`;
    await sql`DROP TABLE IF EXISTS products CASCADE;`;
    await sql`DROP TABLE IF EXISTS categories CASCADE;`;
    await sql`DROP TABLE IF EXISTS brands CASCADE;`;
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    
    // Drop any remaining old tables
    await sql`DROP TABLE IF EXISTS customers CASCADE;`;
    await sql`DROP TABLE IF EXISTS suppliers CASCADE;`;
    await sql`DROP TABLE IF EXISTS inventory CASCADE;`;
    await sql`DROP TABLE IF EXISTS transactions CASCADE;`;
    await sql`DROP TABLE IF EXISTS inventory_movements CASCADE;`;
    await sql`DROP TABLE IF EXISTS order_status_history CASCADE;`;
    await sql`DROP TABLE IF EXISTS locations CASCADE;`;
    await sql`DROP TABLE IF EXISTS reorder_rules CASCADE;`;
    await sql`DROP TABLE IF EXISTS purchase_orders CASCADE;`;
    await sql`DROP TABLE IF EXISTS customer_interactions CASCADE;`;
    await sql`DROP TABLE IF EXISTS receipts CASCADE;`;
    await sql`DROP TABLE IF EXISTS tax_records CASCADE;`;
    await sql`DROP TABLE IF EXISTS email_campaigns CASCADE;`;

    console.log('✅ Tables dropped successfully');
    console.log('🏗️  Creating fresh schema...');

    // Create tables from schema
    await sql`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" varchar(255) NOT NULL,
        "name" varchar(255),
        "role" varchar(50) DEFAULT 'customer' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "brands" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "description" text,
        "logo_url" varchar(255),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "description" text,
        "image_url" varchar(255),
        "banner_image" varchar(255),
        "banner_description" text,
        "parent_id" uuid REFERENCES "categories"("id")
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "products" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "description" text,
        "short_description" text,
        "image" varchar(255),
        "hover_image" varchar(255),
        "detail_image_overlay" varchar(255),
        "price" numeric(10, 2) NOT NULL,
        "compare_price" numeric(10, 2),
        "stock_quantity" integer DEFAULT 0 NOT NULL,
        "weight" varchar(50),
        "dimensions" varchar(100),
        "sku" varchar(100),
        "tags" text[] DEFAULT '{}',
        "is_active" boolean DEFAULT true NOT NULL,
        "category_id" uuid NOT NULL REFERENCES "categories"("id"),
        "brand_id" uuid NOT NULL REFERENCES "brands"("id"),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "carts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid REFERENCES "users"("id"),
        "session_id" varchar(255),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "cart_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "cart_id" uuid NOT NULL REFERENCES "carts"("id") ON DELETE CASCADE,
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "quantity" integer NOT NULL,
        "unit_price" numeric(10, 2) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "orders" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "order_number" varchar(100) NOT NULL UNIQUE,
        "user_id" uuid REFERENCES "users"("id"),
        "email" varchar(255) NOT NULL,
        "phone" varchar(50),
        "first_name" varchar(100) NOT NULL,
        "last_name" varchar(100) NOT NULL,
        "address" text NOT NULL,
        "city" varchar(100) NOT NULL,
        "postal_code" varchar(20),
        "country" varchar(100) NOT NULL,
        "subtotal" numeric(10, 2) NOT NULL,
        "total_amount" numeric(10, 2) NOT NULL,
        "status" varchar(50) DEFAULT 'pending' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "order_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "order_id" uuid NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "product_name" varchar(255) NOT NULL,
        "product_image" varchar(255),
        "quantity" integer NOT NULL,
        "price" numeric(10, 2) NOT NULL,
        "total_amount" numeric(10, 2) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "reviews" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "user_id" uuid REFERENCES "users"("id"),
        "rating" integer NOT NULL,
        "title" varchar(255),
        "comment" text,
        "verified_purchase" boolean DEFAULT false NOT NULL,
        "helpful_votes" integer DEFAULT 0 NOT NULL,
        "status" varchar(50) DEFAULT 'pending' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "wishlist" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id"),
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "refresh_tokens" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id"),
        "token" varchar(255) NOT NULL UNIQUE,
        "expires_at" timestamp NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    console.log('✅ Schema created successfully');
    console.log('🌱 Seeding initial data...');

    // Seed brands
    const brandIds = {};
    const brands = [
      { name: 'Ingco', slug: 'ingco', description: 'Professional power tools and hand tools' },
      { name: 'Total Tools', slug: 'total-tools', description: 'Complete range of tools for professionals' },
      { name: 'Karcher', slug: 'karcher', description: 'High-pressure cleaning solutions' },
      { name: 'Honeywell', slug: 'honeywell', description: 'Safety and security equipment' },
      { name: 'Stanley', slug: 'stanley', description: 'Hand tools and storage solutions' }
    ];

    for (const brand of brands) {
      const result = await sql`
        INSERT INTO brands (name, slug, description, logo_url) 
        VALUES (${brand.name}, ${brand.slug}, ${brand.description}, ${'/brands/' + brand.slug + '.png'})
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          logo_url = EXCLUDED.logo_url
        RETURNING id;
      `;
      brandIds[brand.slug] = result[0].id;
    }

    // Seed categories
    const categoryIds = {};
    const categories = [
      { name: 'Tools', slug: 'tools', description: 'Hand and power tools for every project' },
      { name: 'Outdoor Equipment', slug: 'outdoor-equipment', description: 'Equipment for outdoor projects and maintenance' },
      { name: 'Building Materials', slug: 'building-materials', description: 'Essential materials for construction' },
      { name: 'Home Essentials & Decor', slug: 'home-essentials', description: 'Home improvement and decoration items' },
      { name: 'All Products', slug: 'all-products', description: 'Browse all available products' }
    ];

    for (const category of categories) {
      const result = await sql`
        INSERT INTO categories (name, slug, description, image_url) 
        VALUES (${category.name}, ${category.slug}, ${category.description}, ${'/category-images/' + category.slug + '.png'})
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          image_url = EXCLUDED.image_url
        RETURNING id;
      `;
      categoryIds[category.slug] = result[0].id;
    }

    // Seed sample products
    const products = [
      {
        name: 'Ingco Cordless Drill Set',
        slug: 'ingco-cordless-drill-set',
        description: 'Professional cordless drill with accessories',
        price: 89.99,
        comparePrice: 119.99,
        stockQuantity: 25,
        categoryId: categoryIds['tools'],
        brandId: brandIds['ingco'],
        tags: ['best-seller', 'power-tools'],
        image: '/products/ingco-drill.jpg'
      },
      {
        name: 'Ingco Angle Grinder',
        slug: 'ingco-angle-grinder',
        description: 'Heavy-duty angle grinder for cutting and grinding',
        price: 45.99,
        comparePrice: 59.99,
        stockQuantity: 15,
        categoryId: categoryIds['tools'],
        brandId: brandIds['ingco'],
        tags: ['new-arrival', 'power-tools'],
        image: '/products/ingco-grinder.jpg'
      },
      {
        name: 'Ingco Tool Set 108pcs',
        slug: 'ingco-tool-set-108pcs',
        description: 'Complete tool set for home and professional use',
        price: 129.99,
        comparePrice: 169.99,
        stockQuantity: 10,
        categoryId: categoryIds['tools'],
        brandId: brandIds['ingco'],
        tags: ['best-seller', 'tool-sets'],
        image: '/products/ingco-toolset.jpg'
      },
      {
        name: 'Total Pressure Washer',
        slug: 'total-pressure-washer',
        description: 'High-pressure washer for outdoor cleaning',
        price: 199.99,
        stockQuantity: 8,
        categoryId: categoryIds['outdoor-equipment'],
        brandId: brandIds['total-tools'],
        tags: ['outdoor', 'cleaning'],
        image: '/products/total-pressure-washer.jpg'
      },
      {
        name: 'Total Garden Tool Set',
        slug: 'total-garden-tool-set',
        description: 'Complete set of garden tools',
        price: 79.99,
        stockQuantity: 12,
        categoryId: categoryIds['outdoor-equipment'],
        brandId: brandIds['total-tools'],
        tags: ['new-arrival', 'garden'],
        image: '/products/total-garden-set.jpg'
      }
    ];

    for (const product of products) {
      await sql`
        INSERT INTO products (
          name, slug, description, price, compare_price, stock_quantity, 
          category_id, brand_id, tags, image
        ) 
        VALUES (
          ${product.name}, ${product.slug}, ${product.description}, ${product.price}, 
          ${product.comparePrice || null}, ${product.stockQuantity}, ${product.categoryId}, 
          ${product.brandId}, ${product.tags}, ${product.image}
        )
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          compare_price = EXCLUDED.compare_price,
          stock_quantity = EXCLUDED.stock_quantity;
      `;
    }

    console.log('✅ Sample data seeded successfully');
    console.log('🎉 Database reset and seeding completed!');

  } catch (error) {
    console.error('❌ Error during reset and seed:', error);
    throw error;
  }
}

resetAndSeed().catch(console.error);