import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "/home/rahat3062/.config/purple/test.db",
  },
  verbose: true,
  strict: true,
});
