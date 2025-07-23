import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Transaction } from "./transaction-table/columns";
import { Button } from "./ui/button";
import { createAsync, query } from "@solidjs/router";
import { Student } from "./student-table/columns";
import getStudentHandler from "@/handlers/getStudent";
import { Show } from "solid-js";
import { invoke } from "@tauri-apps/api/core";

const getData = query(async (studentId: string): Promise<Student | null> => {
  const data = await getStudentHandler(studentId);
  return data;
}, "studentProfile");

async function printReceipt() {
  const receiptContent = document.getElementById("receipt-content");
  if (!receiptContent) return;

  const clone = receiptContent.cloneNode(true);
  const receiptHtml = (clone as Element).outerHTML;

  // Build your HTML template as before
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
    <div class="relative w-[712px] h-auto">
        <!-- Background (with opacity) -->
        <div
            class="absolute w-full inset-0 bg-contain bg-no-repeat bg-[url('https://media.istockphoto.com/id/815767786/vector/border-blank.jpg?s=612x612&w=0&k=20&c=o90CPCTo9wYgbTu6iOtvIpsXNvEFVwJwtG3oD-r9ceM=')] opacity-30">
        </div>
        <!-- Content (full opacity, positioned on top) -->
        <div class="relative w-3/4 mx-auto" id="receipt-container">
            ${receiptHtml}
        </div>
    </div>
</body>
</html>`;

  console.log("Receipt HTML Template:", template);

  // ---- **The important part: Call Rust command** ----
  try {
    // Use `invoke` from `@tauri-apps/api/tauri`
    await invoke("open_print_window", {
      args: {
        html_content: template,
      },
    });
  } catch (err) {
    console.error("Failed to open print window:", err);
  }
}

// receipt.tsx
export default function Receipt(props: {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  receiptData?: Transaction;
}) {
  const studentProfile = createAsync(() =>
    getData(props.receiptData?.madeFor || ""),
  );
  return (
    <Drawer
      closeOnOutsideFocus={false}
      closeOnOutsidePointerStrategy="pointerup"
      open={props.open}
      onOpenChange={props.onOpenChange}
      modal={true}
    >
      <DrawerTrigger>Receipt</DrawerTrigger>
      <DrawerContent class="p-6 max-w-lg mx-auto bg-background rounded-t-lg">
        <div id="receipt-content">
          <DrawerHeader>
            <h1 class="text-center font-bold text-3xl">
              Anas Ibne Malik RA. 🕌
            </h1>
            <h3 class="text-center">
              House#11, Road#2, Sector#13, ( Uttara,Dhaka )
            </h3>
            <h3 class="text-center">
              Phone: <strong>01708889916</strong>
            </h3>
          </DrawerHeader>
          <div class="p-4 flex flex-col gap-4">
            <h2 class="text-center font-semibold">( Money Receipt )</h2>
            <div class="flex flex-col gap-4">
              <div class="flex gap-3 justify-between">
                <div>
                  <p>
                    <strong>ID:</strong> {props.receiptData?.id}
                  </p>
                  <p>
                    <strong>Amount:</strong> {props.receiptData?.amount}
                  </p>
                  <p>
                    <strong>Type:</strong> {props.receiptData?.type}
                  </p>
                  <p>
                    <strong>For:</strong> {props.receiptData?.for}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {props.receiptData?.createdAt
                      ? new Date(
                          props.receiptData.createdAt,
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <Show
                  when={studentProfile()}
                  fallback={<p>Loading student profile...</p>}
                >
                  <div>
                    <p>
                      <strong>Student ID:</strong> {studentProfile()?.id}
                    </p>
                    <p>
                      <strong>Student Name:</strong> {studentProfile()?.name}
                    </p>
                    <p>
                      <strong>Age:</strong>{" "}
                      {studentProfile()?.dob !== undefined
                        ? new Date().getFullYear() -
                          new Date(
                            studentProfile()!.dob as unknown as string,
                          ).getFullYear()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Division:</strong> {studentProfile()?.division}
                    </p>
                  </div>
                </Show>
              </div>
              <div class="flex flex-col gap-2">
                <span class="font-semibold text-center">
                  Transaction Description:
                </span>
                <p class="border p-3 rounded-lg">{props.receiptData?.desc}</p>
              </div>
              <div class="flex justify-between items-center mt-3">
                <p>
                  <strong>Signature: </strong>______________
                </p>
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={printReceipt}>Print</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
