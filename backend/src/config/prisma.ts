import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// create pg pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// create adapter
const adapter = new PrismaPg(pool);

// pass adapter to prisma
export const prisma = new PrismaClient({
  adapter,
});