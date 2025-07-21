import { db } from "@/drizzle/core";
import { categories } from "@/drizzle/schema";

export async function addCategoryHandler(name: string): Promise<boolean> {
  try {
    // Insert the new category into the database
    await db.insert(categories).values({ name });
    return true;
  } catch (error) {
    console.error("Error adding category:", error);
    return false;
  }
}
