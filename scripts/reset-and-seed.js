import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function resetAndSeed() {
  try {
    console.log('🗑️  Dropping existing tables...');
    
    // Drop tables in correct order to avoid FK constraint issues
    await db.execute(`DROP TABLE IF EXISTS refresh_tokens CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS wishlist CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS reviews CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS order_items CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS orders CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS cart_items CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS carts CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS products CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS categories CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS brands CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS users CASCADE;`);
    
    // Drop any remaining old tables
    await db.execute(`DROP TABLE IF EXISTS customers CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS suppliers CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS inventory CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS transactions CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS inventory_movements CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS order_status_history CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS locations CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS reorder_rules CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS purchase_orders CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS customer_interactions CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS receipts CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS tax_records CASCADE;`);
    await db.execute(`DROP TABLE IF EXISTS email_campaigns CASCADE;`);

    console.log('✅ Tables dropped successfully');
    console.log('🏗️  Creating fresh schema...');

    // Create tables from schema
    await db.execute(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "email" varchar(255) NOT NULL UNIQUE,
        "password_hash" varchar(255) NOT NULL,
        "name" varchar(255),
        "role" varchar(50) DEFAULT 'customer' NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS "brands" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "description" text,
        "logo_url" varchar(255),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(`
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
    `);

    await db.execute(`
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
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS "carts" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid REFERENCES "users"("id"),
        "session_id" varchar(255),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS "cart_items" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "cart_id" uuid NOT NULL REFERENCES "carts"("id") ON DELETE CASCADE,
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "quantity" integer NOT NULL,
        "unit_price" numeric(10, 2) NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(`
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
    `);

    await db.execute(`
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
    `);

    await db.execute(`
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
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS "wishlist" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id"),
        "product_id" uuid NOT NULL REFERENCES "products"("id"),
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS "refresh_tokens" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id"),
        "token" varchar(255) NOT NULL UNIQUE,
        "expires_at" timestamp NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      );
    `);

    console.log('✅ Schema created successfully');
    console.log('🌱 Seeding initial data...');

    // Seed brands
    const brandData = [
      { name: 'Ingco', slug: 'ingco', description: 'Professional power tools and hand tools' },
      { name: 'Total Tools', slug: 'total-tools', description: 'Complete range of tools for professionals' },
      { name: 'Karcher', slug: 'karcher', description: 'High-pressure cleaning solutions' },
      { name: 'Honeywell', slug: 'honeywell', description: 'Safety and security equipment' },
      { name: 'Stanley', slug: 'stanley', description: 'Hand tools and storage solutions' }
    ];

    for (const brand of brandData) {
      await db.execute(`
        INSERT INTO brands (name, slug, description, logo_url) 
        VALUES ('${brand.name}', '${brand.slug}', '${brand.description}', '/brands/${brand.slug}.png')
        ON CONFLICT (slug) DO NOTHING;
      `);
    }

    // Seed categories
    const categoryData = [
      { name: 'Tools', slug: 'tools', description: 'Hand and power tools for every project' },
      { name: 'Outdoor Equipment', slug: 'outdoor-equipment', description: 'Equipment for outdoor projects and maintenance' },
      { name: 'Building Materials', slug: 'building-materials', description: 'Essential materials for construction' },
      { name: 'Home Essentials & Decor', slug: 'home-essentials', description: 'Home improvement and decoration items' },
      { name: 'All Products', slug: 'all-products', description: 'Browse all available products' }
    ];

    for (const category of categoryData) {
      await db.execute(`
        INSERT INTO categories (name, slug, description, image_url) 
        VALUES ('${category.name}', '${category.slug}', '${category.description}', '/category-images/${category.slug}.png')
        ON CONFLICT (slug) DO NOTHING;
      `);
    }

    // Get inserted IDs for foreign keys
    const toolsCategory = await db.execute(`SELECT id FROM categories WHERE slug = 'tools' LIMIT 1;`);
    const outdoorCategory = await db.execute(`SELECT id FROM categories WHERE slug = 'outdoor-equipment' LIMIT 1;`);
    const ingcoBrand = await db.execute(`SELECT id FROM brands WHERE slug = 'ingco' LIMIT 1;`);
    const totalBrand = await db.execute(`SELECT id FROM brands WHERE slug = 'total-tools' LIMIT 1;`);

    const toolsCategoryId = toolsCategory.rows[0]?.id;
    const outdoorCategoryId = outdoorCategory.rows[0]?.id;
    const ingcoBrandId = ingcoBrand.rows[0]?.id;
    const totalBrandId = totalBrand.rows[0]?.id;

    // Seed some sample products
    if (toolsCategoryId && ingcoBrandId) {
      await db.execute(`
        INSERT INTO products (name, slug, description, price, compare_price, stock_quantity, category_id, brand_id, tags, image) 
        VALUES 
        ('Ingco Cordless Drill Set', 'ingco-cordless-drill-set', 'Professional cordless drill with accessories', 89.99, 119.99, 25, '${toolsCategoryId}', '${ingcoBrandId}', ARRAY['best-seller', 'power-tools'], '/products/ingco-drill.jpg'),
        ('Ingco Angle Grinder', 'ingco-angle-grinder', 'Heavy-duty angle grinder for cutting and grinding', 45.99, 59.99, 15, '${toolsCategoryId}', '${ingcoBrandId}', ARRAY['new-arrival', 'power-tools'], '/products/ingco-grinder.jpg'),
        ('Ingco Tool Set 108pcs', 'ingco-tool-set-108pcs', 'Complete tool set for home and professional use', 129.99, 169.99, 10, '${toolsCategoryId}', '${ingcoBrandId}', ARRAY['best-seller', 'tool-sets'], '/products/ingco-toolset.jpg')
        ON CONFLICT (slug) DO NOTHING;
      `);
    }

    if (outdoorCategoryId && totalBrandId) {
      await db.execute(`
        INSERT INTO products (name, slug, description, price, stock_quantity, category_id, brand_id, tags, image) 
        VALUES 
        ('Total Pressure Washer', 'total-pressure-washer', 'High-pressure washer for outdoor cleaning', 199.99, 8, '${outdoorCategoryId}', '${totalBrandId}', ARRAY['outdoor', 'cleaning'], '/products/total-pressure-washer.jpg'),
        ('Total Garden Tool Set', 'total-garden-tool-set', 'Complete set of garden tools', 79.99, 12, '${outdoorCategoryId}', '${totalBrandId}', ARRAY['new-arrival', 'garden'], '/products/total-garden-set.jpg')
        ON CONFLICT (slug) DO NOTHING;
      `);
    }

    console.log('✅ Sample data seeded successfully');
    console.log('🎉 Database reset and seeding completed!');

  } catch (error) {
    console.error('❌ Error during reset and seed:', error);
    throw error;
  }
}

resetAndSeed().catch(console.error);