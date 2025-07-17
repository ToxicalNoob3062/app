import { Student } from "@/components/student-table/columns";
import { db } from "@/drizzle/core";
import { students } from "@/drizzle/schema";

async function generateStudentId(): Promise<string> {
  while (true) {
    // generate 6 digit random number
    const id = `S-${Math.floor(100000 + Math.random() * 900000)}`;
    //   try to get the student with the same id
    const existingStudent = await db.query.students.findFirst({
      where: (students, { eq }) => eq(students.id, id),
    });
    if (!existingStudent) {
      return id;
    }
    // sleep for 10 ms
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}

export async function addStudentHandler(
  student: Partial<Student>,
): Promise<boolean> {
  student.id = await generateStudentId();
  student.createdAt = Date.now();
  try {
    // Assuming you have a function to add a student to the database
    await db.insert(students).values(student as Student);
    return true;
  } catch (error) {
    console.error("Error adding student:", error);
    return false;
  }
}
