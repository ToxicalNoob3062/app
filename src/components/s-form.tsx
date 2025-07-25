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
import { addStudentHandler } from "@/handlers/addStudent";
import { revalidate } from "@solidjs/router";

export default function StudentForm(props: {
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await addStudentHandler(data);
        await revalidate("studentsData");
        props.onOpenChange?.(false);
      }}
    >
      <CardHeader>
        <CardTitle class="text-2xl">Student Form</CardTitle>
        <CardDescription>Create New Student</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex gap-2">
          <TextFieldRoot class="flex-1">
            <TextField name="name" type="text" placeholder="Name" required />
          </TextFieldRoot>
          <DPicker required name="dob" />
        </div>
        <div class="flex gap-2 mt-4">
          <TextFieldRoot class="flex-1">
            <TextField
              name="contact"
              type="tel"
              placeholder="Phone Number"
              required
              minLength={11}
              maxLength={11}
              pattern="[0-9]{11}"
              inputMode="numeric"
            />
          </TextFieldRoot>
          <SelectComp
            name="division"
            options={["Nurani", "Maqtab", "Hifz"]}
            defaultValue={["Maqtab"]}
          />
        </div>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Create</Button>
      </CardFooter>
    </form>
  );
}
