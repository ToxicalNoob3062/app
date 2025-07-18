import { drizzle } from "drizzle-orm/sqlite-proxy";
import Database from "@tauri-apps/plugin-sql";
import * as schema from "./schema";

let db_core: Database | null = null;
export async function getDb() {
  if (!db_core) {
    db_core = await Database.load("sqlite:test.db");
  }
  return db_core;
}

export const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getDb();
    let rows: any = [];
    let results = [];

    // If the query is a SELECT, use the select method
    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return [];
      });
      console.log("Rows:", rows);
    } else {
      // Otherwise, use the execute method
      rows = await sqlite.execute(sql, params).catch((e) => {
        console.error("SQL Error:", e);
        return [];
      });
      return { rows: [] };
    }

    rows = rows.map((row: any) => {
      return Object.values(row);
    });

    // If the method is "all", return all rows
    results = method === "all" ? rows : rows[0];
    return { rows: results };
  },
  // Pass the schema to the drizzle instance
  { schema: schema, logger: true },
);

function isSelectQuery(sql: string): boolean {
  return /^\s*select\b/i.test(sql);
}
