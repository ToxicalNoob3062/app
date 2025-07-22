import { getTransactionsHandler } from "@/handlers/getTransactions";
import type { Transaction } from "./columns";
import { columns } from "./columns";
import { TDataTable } from "./data-table";
import type { RouteDefinition } from "@solidjs/router";
import { createAsync, query } from "@solidjs/router";
import { Table } from "@tanstack/solid-table";

const getData = query(async (): Promise<Transaction[]> => {
  const data = await getTransactionsHandler();
  return data;
}, "transactionsData");

export const route: RouteDefinition = {
  load: () => getData(),
};

const TransactionTable = (props: {
  ref?: (table: Table<Transaction>) => void;
}) => {
  const data = createAsync(() => getData());
  return (
    <div class="w-full space-y-2.5">
      <TDataTable columns={columns} data={data} ref={props.ref} />
    </div>
  );
};

export default TransactionTable;
