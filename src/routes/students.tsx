import StudentTable, { setDivision } from "@/components/student-table";
import { Button } from "@/components/ui/button";
import FormDialog  from "@/components/f-dialog";
import { Dialog } from "@/components/dialog";
import StudentForm from "@/components/s-form";
import SelectComp from "@/components/select";
import { createSignal } from "solid-js";
import { Table } from "@tanstack/solid-table";
import { Student } from "@/components/student-table/columns";
import removeStudentsHandler from "@/handlers/removeStudents";
import { revalidate } from "@solidjs/router";

export default function Students() {
  const [table, setTable] = createSignal<Table<Student>>();
  const [openForm, setOpenForm] = createSignal(false);
  return (
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <Button variant="default">Broadcast</Button>
        <div class="flex items-center gap-3">
          {table()?.getSelectedRowModel().rows.length && (
            <div class="bg-red-100 hover:bg-red-200 rounded-lg">
              <Dialog
                title="Delete Students"
                description="Are you sure you want to delete these selected students?"
                triggerText="Delete Students"
                actionText="Delete"
                onAction={async () => {
                  const selectedIds = table()
                    ?.getSelectedRowModel()
                    .rows.map((row) => row.original.id);
                  await removeStudentsHandler(selectedIds ?? []);
                  await revalidate("studentsData");
                  table()?.setRowSelection({});
                }}
              />
            </div>
          )}
          <SelectComp
            name="divisionFilter"
            options={["All", "Nurani", "Maqtab", "Hifz"]}
            defaultValue={["All"]}
            onChange={(value) => {
              setDivision(value ?? "All");
            }}
          />
          <FormDialog
            open={openForm()}
            onOpenChange={setOpenForm}
            triggerText="Add Student"
            className="bg-teal-100 hover:bg-teal-200"
          >
            <StudentForm onOpenChange={setOpenForm} />
          </FormDialog>
        </div>
      </div>
      <StudentTable ref={setTable} />
    </div>
  );
}
