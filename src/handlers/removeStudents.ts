import { db } from "@/drizzle/core";
import { students } from "@/drizzle/schema";
import { inArray } from "drizzle-orm";
export default async function removeStudentsHandler(
  ids: string[],
): Promise<boolean> {
  try {
    await db.delete(students).where(inArray(students.id, ids));
    return true;
  } catch (error) {
    console.error("Error deleting students:", error);
    return false;
  }
}
