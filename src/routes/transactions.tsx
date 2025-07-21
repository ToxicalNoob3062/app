import TransactionTable from "@/components/transaction-table";
import { Button } from "@/components/ui/button";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import FormDialog from "@/components/f-dialog";
import { Dialog } from "@/components/dialog";
import TransactionForm from "@/components/t-form";
import SelectComp from "@/components/select";
import { createSignal } from "solid-js";
import { Table } from "@tanstack/solid-table";
import { Transaction } from "@/components/transaction-table/columns";
import removeTransactionsHandler from "@/handlers/removeTransactions";
import { revalidate } from "@solidjs/router";

export default function Transactions() {
  const [table, setTable] = createSignal<Table<Transaction>>();
  const [openForm, setOpenForm] = createSignal(false);
  return (
    <div class="p-6">
      <div class="flex items-center justify-between m-4">
        <div class="flex items-center gap-3">
          <TextFieldRoot class="w-96 bg-background">
            <TextField type="text" placeholder="Intelligent Search 🔍️" />
          </TextFieldRoot>
          <Button variant="outline">Search</Button>
        </div>
        <div class="flex items-center gap-3">
          <div class="bg-red-100 hover:bg-red-200 rounded-lg">
            {table()?.getSelectedRowModel().rows.length && (
              <div class="bg-red-100 hover:bg-red-200 rounded-lg">
                <Dialog
                  title="Delete Transactions"
                  description="Are you sure you want to delete these selected transactions?"
                  triggerText="Delete Transactions"
                  actionText="Delete"
                  onAction={async () => {
                    const selectedIds = table()
                      ?.getSelectedRowModel()
                      .rows.map((row) => row.original.id);
                    await removeTransactionsHandler(selectedIds ?? []);
                    await revalidate("transactionsData");
                    table()?.setRowSelection({});
                  }}
                />
              </div>
            )}
          </div>
          <SelectComp
            name="transactionFilter"
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
      <TransactionTable ref={setTable} />
    </div>
  );
}
