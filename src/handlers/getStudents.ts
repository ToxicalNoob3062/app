import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";

export default async function getStudentsHandler(division: string): Promise<Student[]> {
  if (division === "All") {
    // No filtering, return all
    return await db.query.students.findMany();
  }
  // Filter by division
  return await db.query.students.findMany({
    where: (students, { eq }) => eq(students.division, division),
  });
}
