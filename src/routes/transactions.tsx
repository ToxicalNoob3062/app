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
import SelectComp from "@/components/select";

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
          <SelectComp
            options={["All", "Expense", "Income"]}
            defaultValue={["All"]}
          />
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
