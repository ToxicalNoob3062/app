import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";
import { students } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export default async function updateStudentHandler(
  id: string,
  data: Partial<Student>
): Promise<boolean> {
  try {
    await db.update(students).set(data).where(eq(students.id, id));
    return true;
  } catch (error) {
    console.error("Error updating student:", error);
    return false;
  }
}