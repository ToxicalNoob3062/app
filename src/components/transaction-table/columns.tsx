import type { ColumnDef } from "@tanstack/solid-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox, CheckboxControl } from "../ui/checkbox";
import { Badge } from "@/components/ui/badge";
import FormDialog from "../f-dialog";
import { createSignal, Show } from "solid-js";
import TransactionEditForm from "../t-edit";
import { getData, printReceipt } from "../receipt";
import { createAsync } from "@solidjs/router";
import { Student } from "../student-table/columns";

export type Transaction = {
  id: string;
  amount: number;
  type: string;
  createdAt: number;
  madeFor: string;
  for: string;
  desc: string;
};

import { isAdmin } from "@/components/auth";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        disabled={!isAdmin()}
        indeterminate={table.getIsSomePageRowsSelected()}
        checked={table.getIsAllPageRowsSelected()}
        onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      >
        <CheckboxControl />
      </Checkbox>
    ),
    cell: ({ row }) => (
      <Checkbox
        disabled={!isAdmin()}
        checked={row.getIsSelected()}
        onChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      >
        <CheckboxControl />
      </Checkbox>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: (info) => Math.abs(info.getValue() as number),
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: (info) => (
      <Badge variant={"outline"}>{info.getValue() as string}</Badge>
    ),
  },
  {
    header: "Stamp",
    accessorKey: "createdAt",
    cell: (info) =>
      new Date(info.getValue() as number).toLocaleDateString("en-GB"),
  },
  {
    header: "MadeFor",
    accessorKey: "madeFor",
  },
  {
    header: "For",
    accessorKey: "for",
  },
  {
    id: "actions",
    cell: (info) => {
      const [dialogOpen, setDialogOpen] = createSignal(false);
      const studentProfile = createAsync(() =>
        getData(info.row.original.madeFor || ""),
      );
      return (
        <>
          <DropdownMenu placement="bottom-end">
            <DropdownMenuTrigger class="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="size-4"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Show when={isAdmin()}>
                <DropdownMenuItem
                  onSelect={() => {
                    setDialogOpen(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </Show>
              <DropdownMenuItem
                onSelect={() => {
                  printReceipt(
                    info.row.original,
                    studentProfile() as Student,
                  ).catch((error) => {
                    console.error("Error printing receipt:", error);
                  });
                }}
              >
                Receipt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <FormDialog
            open={dialogOpen()}
            onOpenChange={setDialogOpen}
            triggerText="Edit"
            className="w-fit hidden"
          >
            <TransactionEditForm
              transaction={info.row.original}
              onOpenChange={setDialogOpen}
            />
          </FormDialog>
        </>
      );
    },
  },
];
