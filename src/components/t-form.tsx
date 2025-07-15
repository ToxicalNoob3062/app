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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedMonth, setSelectedMonth] = createSignal<string>(months[0]);
  const [selectedYear, setSelectedYear] = createSignal<number>(currentYear);

  // (Optional) Formatted date string, e.g. "Jun, 2025"
  const formattedDate = () => `${selectedMonth()}, ${selectedYear()}`;

  console.log(formattedDate());
  return (
    <>
      <CardHeader>
        <CardTitle class="text-2xl">Transaction Form</CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2">
          <DecimalNumberField placeholder="Amount" />
          <Select
            options={["Expense", "Income"]}
            defaultValue={["Expense"]}
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
          <Select
            options={["Tuition", "Food", "Transport", "Other"]}
            defaultValue={["Tuition"]}
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
        </div>
        <div class="flex gap-2 mt-4">
          <TextFieldRoot>
            <TextField type="text" placeholder="madeFor" />
          </TextFieldRoot>
          <Select
            class="w-24 bg-background font-medium"
            defaultValue={months[currentMonth]}
            options={months}
            onChange={(val) => setSelectedMonth(val?.toString() ?? "")}
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

          {/* Year Select */}
          <Select
            class="w-20 bg-background font-medium"
            defaultValue={currentYear}
            options={years}
            onChange={(val) => setSelectedYear(Number(val))}
            itemComponent={(props) => (
              <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
            )}
          >
            <SelectTrigger>
              <SelectValue<number>>
                {(state) => state.selectedOption()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <TextFieldRoot class="mt-4">
          <TextArea placeholder="Transaction Description" class="h-40" />
        </TextFieldRoot>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </>
  );
}
