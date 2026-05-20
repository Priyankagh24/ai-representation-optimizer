import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "drizzle-kit";

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root (two levels up from lib/db)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL not found. Make sure .env exists in the project root."
  );
}

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
