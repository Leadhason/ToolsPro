import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(`
DATABASE_URL environment variable is required.

To set up the database:
1. Create a Neon PostgreSQL database at https://neon.tech
2. Copy your connection string
3. Add it to your .env.local file:
   DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/dbname?sslmode=require"
4. Run: npm run db:migrate

Current DATABASE_URL: ${process.env.DATABASE_URL || 'undefined'}
  `);
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export type DB = typeof db;