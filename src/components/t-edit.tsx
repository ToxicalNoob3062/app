import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextArea } from "@/components/ui/textarea";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import SelectComp from "./select";
import DecimalNumberField from "./decimal-f";
import { Transaction } from "./transaction-table/columns";
import { createAsync } from "@solidjs/router";
import { getCategoriesData } from "./c-form";

type Props = {
  transaction?: Partial<Transaction>;
  onOpenChange?: (open: boolean) => void;
};

export default function TransactionEditForm(props: Props) {
  // Month names (Jan, Feb, ..., Dec)
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];
  const categories = createAsync(() => getCategoriesData());
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return date.toLocaleDateString("en-US", { month: "short" });
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let transaction: Partial<Transaction> & { desc: string } = {
          id: props.transaction?.id,
          amount:
            parseFloat(data.amount as string) *
            (data["t-type"] === "Expense" ? -1 : 1),
          type: data.type as string,
          madeFor: data.madeFor as string,
          for: `${data.transactionMonth}-${data.transactionYear}`,
          desc: data.desc as string,
        };
        console.log("Transaction Data:", transaction);
      }}
    >
      <CardHeader>
        <CardTitle class="text-2xl">Transaction Form</CardTitle>
        <CardDescription>Edit Transaction Details</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex gap-2">
          <DecimalNumberField
            name="amount"
            placeholder="Amount"
            className="flex-1"
            defaultValue={props.transaction?.amount}
            required
          />
          <SelectComp
            name="t-type"
            options={["Income", "Expense"]}
            defaultValue={[
              (props.transaction?.amount as number) >= 0 ? "Income" : "Expense",
            ]}
          />
          <SelectComp
            name="type"
            options={categories() || []}
            placeholder="Category"
            defaultValue={[props.transaction?.type || ""]}
          />
        </div>
        <div class="flex gap-2">
          <TextFieldRoot class="flex-1">
            <TextField
              name="madeFor"
              type="text"
              value={props.transaction?.madeFor}
              placeholder="madeFor"
              minLength={8}
              maxLength={8}
              pattern="^S-\d{6}$"
              required
            />
          </TextFieldRoot>
          <SelectComp
            name="transactionMonth"
            options={months}
            defaultValue={[
              props.transaction?.for?.split("-")[0] ||
                months[new Date().getMonth()],
            ]}
          />
          <SelectComp
            name="transactionYear"
            options={years.map(String)}
            defaultValue={[
              props.transaction?.for?.split("-")[1] || String(currentYear),
            ]}
          />
        </div>
        <TextFieldRoot>
          <TextArea
            name="desc"
            placeholder="Transaction Description"
            value={props.transaction?.desc}
            class="h-28"
            required
          />
        </TextFieldRoot>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Edit</Button>
      </CardFooter>
    </form>
  );
}
