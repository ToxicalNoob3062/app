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
import { createSignal } from "solid-js";

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

  // Selected month/year state
  const [selectedMonth, _setSelectedMonth] = createSignal<string>(months[0]);
  const [selectedYear, _setSelectedYear] = createSignal<number>(currentYear);

  // (Optional) Formatted date string, e.g. "Jun, 2025"
  const formattedDate = () => `${selectedMonth()}, ${selectedYear()}`;

  console.log(formattedDate());
  return (
    <>
      <CardHeader>
        <CardTitle class="text-2xl">Transaction Form</CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <div class="flex gap-2">
          <DecimalNumberField placeholder="Amount" className="flex-1" />
          <SelectComp
            name="transactionType"
            options={["Income", "Expense"]}
            defaultValue={["Income"]}
          />
          <SelectComp
            name="transactionCategory"
            options={["Tuition", "Donation", "Other"]}
            defaultValue={["Tuition"]}
          />
        </div>
        <div class="flex gap-2">
          <TextFieldRoot class="flex-1">
            <TextField type="text" placeholder="madeFor" />
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
          <TextArea placeholder="Transaction Description" class="h-28" />
        </TextFieldRoot>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </>
  );
}
