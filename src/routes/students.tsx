import StudentTable from "@/components/student-table";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/f-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog } from "@/components/dialog";

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
          <Select
            class="w-32 bg-background font-medium"
            defaultValue={"Hifz"}
            options={["Maqtab", "Nurani", "Hifz"]}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<string>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
          <FormDialog
            triggerText="Add Student"
            className="bg-teal-100 hover:bg-teal-200"
          >
            <div>Student Form</div>
          </FormDialog>
        </div>
      </div>
      <StudentTable />
    </div>
  );
}
