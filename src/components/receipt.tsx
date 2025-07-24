import { Transaction } from "./transaction-table/columns";
import { query } from "@solidjs/router";
import { Student } from "./student-table/columns";
import getStudentHandler from "@/handlers/getStudent";
import { invoke } from "@tauri-apps/api/core";

export const getData = (studentId: string) =>
  query(async (): Promise<Student | null> => {
    const data = await getStudentHandler(studentId);
    return data;
  }, `student-${studentId}`)();

export async function printReceipt(
  receiptData: Transaction,
  studentProfile: Student,
) {
  // Calculate age based on the student's date of birth
  let age =
    new Date().getFullYear() -
    new Date(studentProfile!.dob as unknown as string).getFullYear();

  // Prepare the HTML content for the receipt
  const receiptHtml = `<div id=\"receipt-content\"><div class=\"grid gap-1.5 p-4 text-center sm:text-left\"><h1 class=\"text-center font-bold text-3xl\">Anas Ibne Malik RA. 🕌</h1><h3 class=\"text-center\">House#11, Road#2, Sector#13, ( Uttara,Dhaka )</h3><h3 class=\"text-center\">Phone: <strong>01708889916</strong></h3></div><div class=\"p-4 flex flex-col gap-4\"><h2 class=\"text-center font-semibold\">( Money Receipt )</h2><div class=\"flex flex-col gap-4\"><div class=\"flex gap-3 justify-between\"><div><p><strong>ID:</strong>${receiptData.id}</p><p><strong>Amount:</strong>${receiptData.amount}</p><p><strong>Type:</strong>${receiptData.type}</p><p><strong>For:</strong>${receiptData.for}</p><p><strong>Date:</strong> ${receiptData.createdAt}</p></div><div><p><strong>Student ID:</strong>${studentProfile.id}</p><p><strong>Student Name:</strong>${studentProfile.name}</p><p><strong>Age:</strong>${age}</p><p><strong>Division:</strong>${studentProfile.division}</p></div></div><div class=\"flex flex-col gap-2\"><span class=\"font-semibold text-center\">Transaction Description:</span><p class=\"border p-3 rounded-lg\">${receiptData.desc}</p></div><div class=\"flex justify-between items-center mt-3\"><p><strong>Signature: </strong>______________</p><p><strong>Date:</strong>${new Date().toLocaleDateString()}</p></div></div></div></div>`;

  // Build your HTML template as before
  const template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Receipt</title>
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <style>
          @media print {
              body {
                  width: 100%;
                  height: auto;
                  transform-origin: top center;
                  transform: scale(0.8) !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  overflow: visible !important;
                  zoom: 1 !important;
                  background: transparent !important;
              }
              #receipt-container {
                  transform: none !important; /* Ensure inner container is not scaled twice */
              }
              #print-btn {
                  display: none !important;
              }
          }
      </style>
  </head>
  <body>
      <div class="relative w-[712px] mx-auto h-auto">
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
