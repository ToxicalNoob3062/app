import { db } from "@/drizzle/core";
import { categories } from "@/drizzle/schema";
export async function getCategoriesHandler(): Promise<string[]> {
  const rows = await db.select().from(categories).all();
  return rows.map((row) => row.name);
}
