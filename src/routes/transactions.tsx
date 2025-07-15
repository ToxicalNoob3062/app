import TransactionTable from "@/components/transaction-table";
import { Button } from "@/components/ui/button";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { FormDialog } from "@/components/f-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog } from "@/components/dialog";
import TransactionForm from "@/components/t-form";

export default function Transactions() {
  return (
    <div class="p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <TextFieldRoot class="w-96 bg-background">
            <TextField type="text" placeholder="Intelligent Search 🔍️" />
          </TextFieldRoot>
          <Button variant="outline">Search</Button>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-red-100 hover:bg-red-200 rounded-lg m-4">
            <Dialog
              title="Delete Transactions"
              description="Are you sure you want to delete these selected transactions?"
              triggerText="Delete Transactions"
              actionText="Delete"
              onAction={() => console.log("Transactions deleted")}
            />
          </div>
          <Select
            class="w-32 bg-background font-medium"
            defaultValue={"All"}
            options={["All", "Exepense", "Income"]}
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
            triggerText="Add Transaction"
            className="bg-teal-100 hover:bg-teal-200"
          >
            <TransactionForm />
          </FormDialog>
        </div>
      </div>
      <TransactionTable />
    </div>
  );
}
