import { getTransactionsHandler } from "@/handlers/getTransactions";
import type { Transaction } from "./columns";
import { columns } from "./columns";
import { TDataTable } from "./data-table";
import { createAsync, query } from "@solidjs/router";
import { Table } from "@tanstack/solid-table";

import { searchQuery } from "@/routes/transactions";

const getData = query(
  async (searchQuery: {
    query: string;
    type: string;
  }): Promise<Transaction[]> => {
    const data = await getTransactionsHandler(searchQuery);
    return data;
  },
  "transactionsData",
);

const TransactionTable = (props: {
  ref?: (table: Table<Transaction>) => void;
}) => {
  const data = createAsync(() => getData(searchQuery));
  return (
    <div class="w-full space-y-2.5">
      <TDataTable columns={columns} data={data} ref={props.ref} />
    </div>
  );
};

export default TransactionTable;
