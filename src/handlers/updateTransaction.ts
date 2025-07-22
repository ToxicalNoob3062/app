import { Transaction } from "@/components/transaction-table/columns";
import { db } from "@/drizzle/core";
import { transactions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function updateTransactionHandler(
  id: string,
  data: Partial<Transaction>,
): Promise<boolean> {
  try {
    await db.update(transactions).set(data).where(eq(transactions.id, id));
    return true;
  } catch (error) {
    console.error("Error updating transaction:", error);
    return false;
  }
}
