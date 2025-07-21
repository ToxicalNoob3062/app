import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";
import { desc } from "drizzle-orm";

export default async function getStudentsHandler(
  division: string,
): Promise<Student[]> {
  if (division === "All") {
    // All records, sorted by createdAt DESC (newest first)
    return await db.query.students.findMany({
      orderBy: (students) => desc(students.createdAt),
    });
  }
  // Filtered, still sorted by createdAt DESC
  return await db.query.students.findMany({
    where: (students, { eq }) => eq(students.division, division),
    orderBy: (students) => desc(students.createdAt),
  });
}
