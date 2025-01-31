import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv'
dotenv.config()

if (!process.env.DATABASE_URL!) {
  throw new Error('DATABASE_URL is not set')
}

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
