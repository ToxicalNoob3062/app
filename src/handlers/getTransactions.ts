import { Transaction } from "@/components/transaction-table/columns";
import { db } from "@/drizzle/core";

const validfilters = new Set(["id", "type", "stamp", "for", "madefor"]);

// en-GB date format: DD/MM/YYYY
function parseDateDDMMYYYY(dateStr: string): Date | null {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return null;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  let year = parseInt(parts[2], 10);
  if (parts[2].length === 2) {
    year += 2000;
  }
  if (year < 2000 || year > 2099) return null;
  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() + 1 !== month ||
    date.getFullYear() !== year
  ) {
    return null;
  }
  return date;
}

function isValidSearchQuery(query: string): boolean {
  if (!query.endsWith(";")) {
    return false;
  }
  query = query.slice(0, -1).trim();
  const parts = query.split(":");
  if (parts.length < 2 || parts.length > 3) return false;
  const filter = parts[0].trim();
  if (!validfilters.has(filter)) return false;
  if (filter === "madefor" && parts.length !== 3) return false;
  if (filter === "stamp") {
    if (parts.length !== 3) return false;
    const date1 = parseDateDDMMYYYY(parts[1]);
    const date2 = parseDateDDMMYYYY(parts[2]);
    if (!date1 || !date2) return false;
    if (date1 > date2) return false;
  }
  if (filter !== "stamp" && filter !== "madefor" && parts.length !== 2)
    return false;
  return true;
}

export async function getTransactionsHandler(searchQuery: {
  query: string;
  type: string;
}): Promise<Transaction[]> {
  // if query is empty go for default query
  let query = searchQuery.query.trim();
  if (!query) {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    query = `stamp:${firstDayOfMonth.toLocaleDateString("en-GB")}:${today.toLocaleDateString("en-GB")};`;
  }
  // if not ended ; yet return default rows
  if (!isValidSearchQuery(query)) {
    console.warn("Invalid search query:", query);
    return [];
  }
  // get the filter
  const pureQuery = query.slice(0, -1).trim();
  const parts = pureQuery.split(":");
  const filter = parts[0].trim().toLocaleLowerCase();
  // process the quries as per the filter
  switch (filter) {
    case "id":
      return await db.query.transactions.findMany({
        where: (transactions, { eq }) => eq(transactions.id, parts[1].trim()),
      });
    case "type":
      return await db.query.transactions.findMany({
        where: (transactions, { and, eq, lt, gt }) => {
          let transType = parts[1].trim(); //can be anything like tuition, feem grocery etc.
          switch (transType) {
            case "Expense":
              return and(
                eq(transactions.type, transType),
                lt(transactions.amount, 0),
              );
            case "Income":
              return and(
                eq(transactions.type, transType),
                gt(transactions.amount, 0),
              );
            default:
              return eq(transactions.type, transType);
          }
        },
        orderBy: (transactions, { desc }) => desc(transactions.createdAt),
      });
    case "for":
      return await db.query.transactions.findMany({
        where: (transactions, { eq, and, lt, gt }) => {
          let forValue = parts[1].trim();
          switch (searchQuery.type) {
            case "Expense":
              return and(
                eq(transactions.for, forValue),
                lt(transactions.amount, 0),
              );
            case "Income":
              return and(
                eq(transactions.for, forValue),
                gt(transactions.amount, 0),
              );
            default:
              return eq(transactions.for, forValue);
          }
        },
        orderBy: (transactions, { desc }) => desc(transactions.createdAt),
      });
    case "madefor": {
      const madeForValue = parts[1].trim();
      const year = parts[2].trim();
      console.log("Made for value:", madeForValue, "Year:", year);
      return await db.query.transactions.findMany({
        where: (transactions, { eq, like, and }) =>
          and(
            eq(transactions.madeFor, madeForValue),
            like(transactions.for, `%-${year}`),
          ),
        orderBy: (transactions, { desc }) => desc(transactions.createdAt),
      });
    }
    default: {
      // stamp filter
      const date1 = parseDateDDMMYYYY(parts[1]) as Date;
      let date2 = parseDateDDMMYYYY(parts[2]) as Date;
      date2 = new Date(
        date2.getFullYear(),
        date2.getMonth(),
        date2.getDate(),
        23,
        59,
        59,
        999,
      );
      if (!date1 || !date2) return [];
      return await db.query.transactions.findMany({
        where: (transactions, { gte, lte, and, gt, lt }) => {
          switch (searchQuery.type) {
            case "Expense":
              return and(
                gte(transactions.createdAt, date1.getTime()),
                lte(transactions.createdAt, date2.getTime()),
                lt(transactions.amount, 0),
              );
            case "Income":
              return and(
                gte(transactions.createdAt, date1.getTime()),
                lte(transactions.createdAt, date2.getTime()),
                gt(transactions.amount, 0),
              );
            default:
              return and(
                gte(transactions.createdAt, date1.getTime()),
                lte(transactions.createdAt, date2.getTime()),
              );
          }
        },
        orderBy: (transactions, { desc }) => desc(transactions.createdAt),
      });
    }
  }
}
