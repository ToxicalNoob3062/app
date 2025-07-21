import { Transaction } from "@/components/transaction-table/columns";
import { db } from "@/drizzle/core";
import { transactions } from "@/drizzle/schema";

async function generateTransactionId(timestamp: number): Promise<string> {
  while (true) {
    // Extract date components from timestamp (YYYYMMDD)
    const date = new Date(timestamp);
    const dateStr =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0");

    // Generate 4-digit random number
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    // Combine: T-YYYYMMDD-RRRR (e.g., T-20250721-3847)
    const id = `T-${dateStr}-${randomPart}`;

    // Check if this ID already exists
    const existingTransaction = await db.query.transactions.findFirst({
      where: (transactions, { eq }) => eq(transactions.id, id),
    });

    if (!existingTransaction) {
      return id;
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

export default async function addTransactionHandler(
  transaction: Partial<Transaction> & { desc: string },
): Promise<boolean> {
  try {
    const now = Date.now();
    // Construct a complete transaction object with required fields
    const completeTransaction = {
      id: await generateTransactionId(now),
      amount: transaction.amount as number,
      type: transaction.type as string,
      createdAt: now,
      madeFor: transaction.madeFor as string,
      for: transaction.for as string,
      desc: transaction.desc,
    };
    await db.insert(transactions).values(completeTransaction);
    return true;
  } catch (error) {
    console.error("Error adding transaction:", error);
    return false;
  }
}
