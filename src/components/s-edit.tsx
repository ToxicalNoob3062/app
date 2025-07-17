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

export default function StudentEditForm(props: {
  studentId: string;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        props.onOpenChange?.(false);
        // Handle the edit logic here, e.g., send data to the server
        console.log(`Edited Student Data: ${props.studentId}`, data);
      }}
    >
      <CardHeader>
        <CardTitle class="text-2xl">Student Form</CardTitle>
        <CardDescription>Edit Student Details</CardDescription>
      </CardHeader>
      <CardContent>
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
        <Button type="submit">Edit</Button>
      </CardFooter>
    </form>
  );
}
