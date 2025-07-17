import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";
export default async function getStudentsHandler(): Promise<Student[]> {
  const allStudents = await db.query.students.findMany();
  return allStudents;
}
