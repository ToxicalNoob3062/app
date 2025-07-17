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
import updateStudentHandler from "@/handlers/updateStudent";
import { revalidate } from "@solidjs/router";
import { Student } from "./student-table/columns";

export default function StudentEditForm(props: {
  studentId: string;
  previous: Partial<Student>
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        await updateStudentHandler(props.studentId, data);
        await revalidate("studentsData");
        props.onOpenChange?.(false);
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
              value={props.previous.contact}
            />
          </TextFieldRoot>
          <SelectComp
            name="division"
            options={["Nurani", "Maqtab", "Hifz"]}
            defaultValue={[props.previous.division || "Maqtab"]}
          />
        </div>
      </CardContent>
      <CardFooter class="flex justify-center items-center">
        <Button type="submit">Edit</Button>
      </CardFooter>
    </form>
  );
}
