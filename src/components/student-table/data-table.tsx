import type { ColumnDef } from "@tanstack/solid-table";
import {
  flexRender,
  createSolidTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/solid-table";
import { For, Show, splitProps, Accessor, createSignal } from "solid-js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Student } from "./columns";
import { Button } from "../ui/button";

type Props = {
  columns: ColumnDef<Student>[];
  data: Accessor<Student[] | undefined>;
};

export const SDataTable = (props: Props) => {
  const [local] = splitProps(props, ["columns", "data"]);
  const [pagination, setPagination] = createSignal({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = createSolidTable({
    get data() {
      return local.data() || [];
    },
    columns: local.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      get pagination() {
        return pagination();
      },
    },
    onPaginationChange: setPagination,
  });

  return (
    <div>
      <Table class="rounded-lg border font-medium">
        <TableHeader class="bg-secondary text-secondary-foreground">
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <TableRow>
                <For each={headerGroup.headers}>
                  {(header) => {
                    return (
                      <TableHead>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  }}
                </For>
              </TableRow>
            )}
          </For>
        </TableHeader>
        <TableBody>
          <Show
            when={table.getRowModel().rows?.length}
            fallback={
              <TableRow>
                <TableCell
                  colSpan={local.columns.length}
                  class="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          >
            <For each={table.getRowModel().rows}>
              {(row) => {
                return (
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <TableCell>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      )}
                    </For>
                  </TableRow>
                );
              }}
            </For>
          </Show>
        </TableBody>
      </Table>
      <div class="flex items-center justify-between space-x-2 py-2">
        <p class="text-slate-400 text-2xl bg-background">
          <span class="font-medium">Total Students ~ </span>100
        </p>
        <div class="flex items-center justify-center whitespace-nowrap text-sm font-medium bg-background p-3">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div class="flex items-center space-x-2">
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            class="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 6l-6 6l6 6"
              />
            </svg>
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            class="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 6l6 6l-6 6"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
