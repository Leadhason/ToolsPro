import { db } from "./client";
import { customers } from "./schema";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Create a test customer account
    const passwordHash = await bcrypt.hash("password123", 10);
    
    const customer1 = await db.insert(customers).values({
      email: "test@example.com",
      passwordHash,
      name: "Test Customer",
      role: "customer"
    }).returning();

    console.log("Created customer:", customer1[0]);

    // Create an admin customer account
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    
    const adminCustomer = await db.insert(customers).values({
      email: "admin@example.com",
      passwordHash: adminPasswordHash,
      name: "Admin User",
      role: "admin"
    }).returning();

    console.log("Created admin customer:", adminCustomer[0]);



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