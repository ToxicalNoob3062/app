import { createSignal } from "solid-js";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextField, TextFieldRoot } from "@/components/ui/textfield";
import { Button } from "./ui/button";
import passHandler from "@/handlers/pass";

export const [isAdmin, setIsAdmin] = createSignal(false);

export default function Auth() {
  const [adminFormOpen, setAdminFormOpen] = createSignal(false);
  return (
    <Popover
      open={adminFormOpen()}
      onOpenChange={(e) => {
        if (e && !isAdmin()) {
          setAdminFormOpen(true);
        }
        if (isAdmin() || !e) {
          setAdminFormOpen(false);
          if (isAdmin()) {
            setIsAdmin(false);
          }
        }
      }}
      modal
    >
      <PopoverTrigger>
        <Switch checked={isAdmin()}>
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel class="ml-2">
            {isAdmin() ? "Admin" : "Viewer"}
          </SwitchLabel>
        </Switch>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const password = formData.get("password") as string;
            const newPassword = formData.get("newPassword") as string;
            let isSuccess = await passHandler(password, newPassword);
            if (isSuccess) {
              setIsAdmin(!isAdmin());
              setAdminFormOpen(false);
            } else {
              alert("Incorrect password or error updating password.");
            }
          }}
          class="flex flex-col items-center gap-3 justify-center"
        >
          <h1 class="font-semibold"> Admin Verification</h1>
          {/* password */}
          <TextFieldRoot>
            <TextField
              name="password"
              type="password"
              placeholder="PIN Code"
              // only numbers
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </TextFieldRoot>
          {/* new password */}
          <TextFieldRoot>
            <TextField
              name="newPassword"
              type="password"
              placeholder="New PIN Code"
              pattern="[0-9]*"
              inputMode="numeric"
            />
          </TextFieldRoot>
          <Button type="submit">Switch</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
