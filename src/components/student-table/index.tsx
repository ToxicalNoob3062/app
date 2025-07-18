import getStudentsHandler from "@/handlers/getStudents";
import type { Student } from "./columns";
import { columns } from "./columns";
import { SDataTable } from "./data-table";
import { createAsync, query } from "@solidjs/router";
import { Table } from "@tanstack/solid-table";
import { createSignal } from "solid-js";

export const [division, setDivision] = createSignal("All");

const getData = query(async (division: string): Promise<Student[]> => {
  const students = await getStudentsHandler(division);
  return students;
}, "studentsData");

const StudentTable = (props: { ref?: (table: Table<Student>) => void }) => {
  const data = createAsync(() => getData(division()));
  return (
    <div class="w-full space-y-2.5">
      <SDataTable columns={columns} data={data} ref={props.ref} />
    </div>
  );
};

export default StudentTable;
