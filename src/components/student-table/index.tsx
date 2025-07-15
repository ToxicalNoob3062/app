import type { Student } from "./columns";
import { columns } from "./columns";
import { SDataTable } from "./data-table";
import type { RouteDefinition } from "@solidjs/router";
import { createAsync, query } from "@solidjs/router";

const getData = query(async (): Promise<Student[]> => {
  // Fetch data from your API here.
  let data = [
    {
      id: "S-146012",
      name: "John Doe",
      age: 16,
      division: "Maqtab",
      contact: "123-456-7890",
      createdAt: Date.now(),
    },
    {
      id: "S-223486",
      name: "Jane Smith",
      age: 17,
      division: "Hifz",
      contact: "987-654-3210",
      createdAt: Date.now(),
    }
    // ...
  ];
  while (data.length < 100) {
    data.push(data[Math.floor(Math.random() * data.length)] );
  }
  return data;
}, "data");

export const route: RouteDefinition = {
  load: () => getData()
};

const StudentTable = () => {
  const data = createAsync(() => getData());

  return (
    <div class="w-full space-y-2.5">
      <SDataTable columns={columns} data={data} />
    </div>
  );
};

export default StudentTable;
