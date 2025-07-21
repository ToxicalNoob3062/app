import { db } from "@/drizzle/core";
import { transactions } from "@/drizzle/schema";
import { inArray } from "drizzle-orm";

export default async function removeTransactionsHandler(
  ids: string[],
): Promise<boolean> {
  try {
    await db.delete(transactions).where(inArray(transactions.id, ids));
    return true;
  } catch (error) {
    console.error("Error removing transactions:", error);
    return false;
  }
}
