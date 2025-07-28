import { db } from "@/drizzle/core";
import { students, transactions } from "@/drizzle/schema";
import { and, eq, isNull } from "drizzle-orm";

export default async function getUnpaidHandler(
  forValue: string,
): Promise<string[]> {
  // get all the students ids who do not have a transaction for the given 'for' value under the 'Tuition' category
  const unpaid = await db
    .select({
      id: students.id,
    })
    .from(students)
    .leftJoin(
      transactions,
      and(
        eq(transactions.madeFor, students.id),
        eq(transactions.type, "Tuition"),
        eq(transactions.for, forValue),
      ),
    )
    .where(isNull(transactions.id))
    .execute();

  return unpaid.map((student: { id: string }) => student.id);
}
