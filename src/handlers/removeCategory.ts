import { db } from "@/drizzle/core";
import { categories } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function removeCategoryHandler(name: string): Promise<boolean> {
  try {
    await db.delete(categories).where(eq(categories.name, name));
    return true;
  } catch (error) {
    console.error("Error removing category:", error);
    return false;
  }
}
