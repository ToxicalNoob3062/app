import { Transaction } from "@/components/transaction-table/columns";
import { db } from "@/drizzle/core";
import { transactions } from "@/drizzle/schema";

export async function getTransactionsHandler(): Promise<
  Transaction[] & { desc: string }[]
> {
  const rows = await db.select().from(transactions).all();
  return rows.map((row) => ({
    id: row.id,
    amount: row.amount,
    type: row.type,
    createdAt: row.createdAt,
    madeFor: row.madeFor,
    for: row.for,
    desc: row.desc,
  }));
}
