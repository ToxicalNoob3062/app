import StudentTable from "@/components/student-table";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/f-dialog";
import { Dialog } from "@/components/dialog";
import StudentForm from "@/components/s-form";
import SelectComp from "@/components/select";

export default function Students() {
  return (
    <div class="p-6">
      <div class="flex items-center justify-between">
        <Button variant="default">Broadcast</Button>
        <div class="flex items-center gap-3">
          <div class="bg-red-100 hover:bg-red-200 rounded-lg m-4">
            <Dialog
              title="Delete Students"
              description="Are you sure you want to delete these selected students?"
              triggerText="Delete Students"
              actionText="Delete"
              onAction={() => console.log("Students deleted")}
            />
          </div>
          <SelectComp
            options={["All","Nurani", "Maqtab", "Hifz"]}
            defaultValue={["All"]}
          />
          <FormDialog
            triggerText="Add Student"
            className="bg-teal-100 hover:bg-teal-200"
          >
            <StudentForm />
          </FormDialog>
        </div>
      </div>
      <StudentTable />
    </div>
  );
}
