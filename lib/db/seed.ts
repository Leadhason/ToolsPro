import { db } from "./client";
import { categories, brands, products, users } from "./schema";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Seed categories
    const category1 = await db.insert(categories).values({
      name: "Power Tools",
      slug: "power-tools",
      description: "Electric and cordless power tools for construction and maintenance",
      imageUrl: "/category-images/power-tools.png"
    }).returning();

    const category2 = await db.insert(categories).values({
      name: "Building Materials",
      slug: "building-materials", 
      description: "Construction materials and supplies",
      imageUrl: "/category-images/building-materials.png"
    }).returning();

    const category3 = await db.insert(categories).values({
      name: "Home Essentials",
      slug: "home-essentials",
      description: "Essential tools and equipment for home maintenance",
      imageUrl: "/category-images/home-essentials.png"
    }).returning();

    // Seed brands
    const brand1 = await db.insert(brands).values({
      name: "Total Tools",
      slug: "total-tools",
      description: "Professional quality power tools and equipment",
      logoUrl: "/brands/total-tools.png"
    }).returning();

    const brand2 = await db.insert(brands).values({
      name: "Ingco",
      slug: "ingco",
      description: "Reliable tools for professionals and DIY enthusiasts",
      logoUrl: "/brands/ingco.png"
    }).returning();

    const brand3 = await db.insert(brands).values({
      name: "Karcher",
      slug: "karcher",
      description: "Leading manufacturer of cleaning equipment",
      logoUrl: "/brands/karcher.png"
    }).returning();

    // Seed some sample products
    await db.insert(products).values([
      {
        name: "Total Tools Pressure Washer 2000W",
        slug: "total-tools-pressure-washer-2000w",
        description: "High-pressure washer perfect for cleaning outdoor surfaces, vehicles, and equipment. Features adjustable pressure settings and multiple nozzle attachments.",
        shortDescription: "Powerful 2000W pressure washer for heavy-duty cleaning tasks",
        price: "850.00",
        comparePrice: "950.00",
        sku: "TT-PW-2000",
        stockQuantity: 25,
        isActive: true,
        isFeatured: true,
        categoryId: category1[0].id,
        brandId: brand1[0].id,
        images: ["/products/pressure-washer-1.jpg", "/products/pressure-washer-2.jpg"],
        tags: ["new-arrival", "power-tools", "cleaning"],
        specifications: {
          "Power": "2000W",
          "Max Pressure": "150 Bar",
          "Water Flow": "7.5 L/min",
          "Weight": "18kg"
        }
      },
      {
        name: "Ingco LED Work Light 30W",
        slug: "ingco-led-work-light-30w",
        description: "Portable LED work light with adjustable stand. Perfect for construction sites, workshops, and emergency lighting.",
        shortDescription: "Bright 30W LED work light with adjustable stand",
        price: "125.00",
        comparePrice: "150.00",
        sku: "INGCO-LED-30",
        stockQuantity: 50,
        isActive: true,
        isFeatured: false,
        categoryId: category1[0].id,
        brandId: brand2[0].id,
        images: ["/products/led-light-1.jpg", "/products/led-light-2.jpg"],
        tags: ["lighting", "led", "work-light"],
        specifications: {
          "Power": "30W",
          "Lumens": "3000 lm",
          "IP Rating": "IP65",
          "Cable Length": "2m"
        }
      },
      {
        name: "Karcher Window Cleaner WV 5",
        slug: "karcher-window-cleaner-wv-5",
        description: "Professional window cleaning vacuum with streak-free results. Ideal for windows, mirrors, and smooth surfaces.",
        shortDescription: "Professional window vacuum cleaner for streak-free cleaning",
        price: "280.00",
        comparePrice: "320.00",
        sku: "KAR-WV5",
        stockQuantity: 15,
        isActive: true,
        isFeatured: true,
        categoryId: category3[0].id,
        brandId: brand3[0].id,
        images: ["/products/window-cleaner-1.jpg", "/products/window-cleaner-2.jpg"],
        tags: ["cleaning", "windows", "home"],
        specifications: {
          "Battery Life": "35 minutes",
          "Tank Capacity": "100ml",
          "Weight": "0.7kg",
          "Blade Width": "280mm"
        }
      }
    ]);

    // Create a test user
    const hashedPassword = await bcrypt.hash("password123", 12);
    await db.insert(users).values({
      email: "test@example.com",
      passwordHash: hashedPassword,
      name: "Test User",
      role: "customer"
    });

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Seed completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}