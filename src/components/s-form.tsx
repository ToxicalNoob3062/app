import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";

import SelectComp from "./select";
import DPicker from "./d-picker";

export default function StudentForm() {
  return (
    <>
      <CardHeader>
        <CardTitle class="text-2xl">Student Form</CardTitle>
        <CardDescription>Fill in the details below</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2">
          <TextFieldRoot class="flex-1">
            <TextField type="text" placeholder="Name" />
          </TextFieldRoot>
          <DPicker />
        </div>
        <div class="flex gap-2 mt-4">
          <TextFieldRoot class="flex-1">
            <TextField type="tel" placeholder="Phone Number" />
          </TextFieldRoot>
          <SelectComp
            options={["Nurani", "Maqtab", "Hifz"]}
            defaultValue={["Maqtab"]}
          />
        </div>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </>
  );
}
