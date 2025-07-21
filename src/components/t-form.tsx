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

export default function TransactionForm() {
  // Current year for dynamic year options
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const years = [currentYear, currentYear + 1];

  // Month names (Jan, Feb, ..., Dec)
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return date.toLocaleDateString("en-US", { month: "short" });
  });

  return (
    <form onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            let transaction : Transaction & { desc: string } = {
              id: crypto.randomUUID(),
              amount: parseFloat(data.amount as string) * (data["t-type"] === "Expense" ? -1 : 1),
              type: data.type as string,
              createdAt: Date.now(),
              madeFor: data.madeFor as string,
              for: `${data.transactionMonth}-${data.transactionYear}`,
              desc: data.desc as string,
            }
            console.log(transaction);
      }}>
      <CardHeader>
        <CardTitle class="text-2xl">Transaction Form</CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex gap-2">
          <DecimalNumberField name="amount" placeholder="Amount" className="flex-1" required />
          <SelectComp
            name="t-type"
            options={["Income", "Expense"]}
            defaultValue={["Income"]}
          />
          <SelectComp
            name="type"
            options={["Tuition", "Donation", "Other"]}
            defaultValue={["Tuition"]}
          />
        </div>
        <div class="flex gap-2">
          <TextFieldRoot class="flex-1">
            <TextField name="madeFor" type="text" placeholder="madeFor" minLength={8} maxLength={8} pattern="^S-\d{6}$" required />
          </TextFieldRoot>
          <SelectComp
            name="transactionMonth"
            options={months}
            defaultValue={[months[currentMonth]]}
          />
          <SelectComp
            name="transactionYear"
            options={years.map(String)}
            defaultValue={[String(currentYear)]}
          />
        </div>
        <TextFieldRoot>
          <TextArea name="desc" placeholder="Transaction Description" class="h-28" required/>
        </TextFieldRoot>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </form>
  );
}
