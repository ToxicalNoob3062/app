import getStudentsHandler from "@/handlers/getStudents";
import type { Student } from "./columns";
import { columns } from "./columns";
import { SDataTable } from "./data-table";
import { createAsync, query } from "@solidjs/router";
import { Table } from "@tanstack/solid-table";

const getData = query(async (): Promise<Student[]> => {
  const students = await getStudentsHandler();
  return students;
}, "studentsData");

const StudentTable = (props: { ref?: (table: Table<Student>) => void }) => {
  const data = createAsync(() => getData());
  return (
    <div class="w-full space-y-2.5">
      <SDataTable columns={columns} data={data} ref={props.ref} />
    </div>
  );
};

export default StudentTable;
