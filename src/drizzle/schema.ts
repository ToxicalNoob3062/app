// just define a dummy student table for now
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const students = sqliteTable("students", {
  id: text("id").primaryKey(),
  name: text("name"),
  age: integer("age"),
  division: text("division"),
  contact: text("contact"),
  createdAt: integer("created_at"),
});

export const categories = sqliteTable("categories", {
  name: text("name").primaryKey(),
  description: text("description"),
});

export const transactions = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  amount: real("amount"),
  type: text("type")
    .notNull()
    .references(() => categories.name),
  createdAt: integer("created_at"),
  madeFor: text("made_for").references(() => students.id),
  for: text("for"),
  desc: text("desc"),
});

export const metadata = sqliteTable("metadata", {
  key: text("key").primaryKey(),
  value: text("value"),
});
