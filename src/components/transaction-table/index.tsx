import type { Transaction } from "./columns";
import { columns } from "./columns";
import { TDataTable } from "./data-table";
import type { RouteDefinition } from "@solidjs/router";
import { createAsync, query } from "@solidjs/router";

const getData = query(async (): Promise<Transaction[]> => {
  // Fetch data from your API here.
  let data = [
    {
      id: "T-12515412",
      amount: 1000.45,
      type: "admission",
      createdAt: Date.now(),
      madeFor: "S-146012",
      for: "Sep, 2023",
    },
    {
      id: "T-16295412",
      amount: -2000.63,
      type: "exam-fee",
      createdAt: Date.now(),
      madeFor: "S-223486",
      for: "Jun, 2018",
    },
    // ...
  ];
  while (data.length < 100) {
    data.push(data[Math.floor(Math.random() * data.length)]);
  }
  return data;
}, "transactionsData");

export const route: RouteDefinition = {
  load: () => getData(),
};

const TransactionTable = () => {
  const data = createAsync(() => getData());

  return (
    <div class="w-full space-y-2.5">
      <TDataTable columns={columns} data={data} />
    </div>
  );
};

export default TransactionTable;
