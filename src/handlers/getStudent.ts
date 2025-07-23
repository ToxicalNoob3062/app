import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";

export default async function getStudentHandler(
  studentId: string,
): Promise<Student | null> {
  // Fetch a single student by ID
  const student = await db.query.students.findFirst({
    where: (students, { eq }) => eq(students.id, studentId),
  });
  // Return the student or null if not found
  return student || null;
}
